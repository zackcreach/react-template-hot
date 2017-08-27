const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// for production build, grab the NODE_ENV from the host (e.g. Heroku), otherwise default back to 'development'
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

module.exports = {
  entry: {
    app: [
      'webpack-dev-server/client?http://localhost:3000', // WebpackDevServer host and port
      'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
      'babel-polyfill',
      './app/app.jsx',
    ]
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/', // publicPath is what the server is directed to
  },
  resolve: {
    modules: [ // adding components means we can import in component names as-is
      'node_modules',
      './app/components',
    ],
    alias: { // adding these aliases means we don't need a long address when importing into components (images/test.jpg vs ../../images/test.jpg)
      images: path.resolve(__dirname, 'app/images/'),
      styles: path.resolve(__dirname, 'app/styles/'),
    },
    extensions: ['.json', '.js', '.jsx', '.css', '.scss', '.jpg', '.jpeg', '.png', '.gif', '.svg'],
  },
  plugins: [ // To inject changes when running webpack-dev-server
    new webpack.HotModuleReplacementPlugin(), // To actually name the modules loaded within the chrome console
    new webpack.NamedModulesPlugin(), // Don't make/load changes if there's errors
    new webpack.NoEmitOnErrorsPlugin(), // Extract all css files in the app/styles folder and save as a single file in public/styles/styles.css
    new ExtractTextPlugin({ // Extract individual css files into combined file (see module settings below)
      filename: 'styles/styles.css',
      ignoreOrder: true, // Useful for CSS modules
    }),
    new webpack.optimize.UglifyJsPlugin({ // File size savings via minification! Sourcemaps are enabled below, so this is enabled in dev and production
      compress: {
        warnings: false
      },
    }),
    // Disabled as it only adds script tags, does not check for existing tags and keeps adding on
    // new HtmlWebpackPlugin({
    //   template: 'public/index.html',
    //   inject: true,
    // }),
  ],
  devServer: { // Webpack config settings for webpack-dev-server. This can also be broken out into webpack-dev-server.js or server.js, but these parameters will override
    host: 'localhost',
    contentBase: './public', // contentBase is where your index.html file is, which in this case is not located in root (default) so we specify './public' instead
    port: 3000,
    hot: true, // necessary for hot module replacement plugin, can also be started with the webpack-dev-server --hot flag
    open: true, // open simply opens the browser to localhost when webpack compiles
    openPage: '', // openPage fixes a current issue where the "open" attribute opens to localhost:3000/undefined. It's an open issue on Github
    historyApiFallback: true, // on refresh in a subdirectory, sends any not found page back to / and then react router will pick up and redirect to the right place
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, // regex tests for js or jsx, the ? makes the x optional, meaning it will run through js and jsx scripts, $ indicates end of string
        loader: 'babel-loader', // babel loader references .babelrc for plugins and presets, interpreting ES6 and react syntax to render correctly on all browsers
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/, // regex tests for scss or css. the ? after makes the s optional, and the $ indicates end of string
        use: [
          {
            loader: 'css-hot-loader', // this loader is a lot like react-hot-loader: it loads new css chunks as they're saved
            options: {
              // fileMap: 'styles/styles.css',
            }
          }
        ].concat(ExtractTextPlugin.extract({
          fallback: 'style-loader', // fallback is style-loader, which directly injects styles into the page (via <style> tags)
          use: [
            {
              loader: 'css-loader', // this loader lets you bring in css files as an import in components
              options: {
                importLoaders: 1,
                // CSS Modules config below; disabled for now in lieu of a single stylesheet (./public/styles/styles.css) using BEM
                // modules: true,
                // localIdentName: '[local]--[hash:base64:3]',
              },
            },
            'postcss-loader',
          ],
        })),
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader', // this loader lets you bring in images as an import in components
            options: {
              context: './app/images/',
              name: 'images/[path][name].[ext]',
            },
          }, {
            loader: 'image-webpack-loader', // this loader optimizes file size
            options: {
              mozjpeg: {
                quality: 85,
                progressive: true,
              },
              pngquant: {
                quality: '75-90',
                speed: 3,
              },
              optipng: {
                optimizationLevel: 7,
              },
              svgo: {
                plugins: [
                  {
                    removeViewBox: true
                  },
                  {
                    removeEmptyAttrs: true
                  },
                ],
              },
            },
          },
        ],
      },
    ],
  },
  devtool: process.env.NODE_ENV === 'production' ? undefined : 'cheap-module-eval-source-map',
};
