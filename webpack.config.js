const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = env => {
  return {
    entry: {
      app: [
        'webpack-dev-server/client?http://localhost:3000', // WebpackDevServer host and port
        'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
        './app/app.jsx',
      ]
    },
    output: {
      path: path.resolve(__dirname, 'public/scripts'),
      filename: 'bundle.js',
      publicPath: '/',
    },
    resolve: {
      modules: [
        'node_modules',
        './app/components',
      ],
      alias: {
        // Main: path.resolve(__dirname, 'app/components/Main.jsx'),
      },
      extensions: ['.json', '.js', '.jsx'],
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      new ExtractTextPlugin('styles/styles.css'),
    ],
    devServer: {
      host: 'localhost',
      port: 3000,
      hot: true,
      contentBase: './public',
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          // babel-loader looks for (and references) .babelrc for presets and plugins
          loaders: ['babel-loader'],
          exclude: /(node_modules)/,
        },
        {
          test: /\.css$/,
          use: [
            // run css-hot-loader first before ExtractTextPlugin (by concatenating). Note that the ExtractTextPlugin constrcutor above
            // must have a filename argument that matches where the stylesheet is pointing to in index.html
            // In this case, both are pointing to styles/styles.css
            {
              loader: 'css-hot-loader',
              options: {
                // fileMap option useful for if the styles {filename} differs. Default is fileMap: {filename}
                // fileMap: 'styles/styles.css',
              }
            }
          ].concat(ExtractTextPlugin.extract({
            // style loader simply inserts css into dom as style tags
            fallback: 'style-loader',
            use: [
              {
                // css-loader
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                  // turning on modules adds unique classes to each component
                  modules: true,
                  sourceMap: true,
                  localIdentName: '[local]--[hash:base64:5]',
                },
              },
              // postcss-loader looks for postcss.config.js for additional plugins
              'postcss-loader',
            ],
          })),
        },
      ],
    },
    devtool: 'cheap-module-eval-source-map'
  }
};
