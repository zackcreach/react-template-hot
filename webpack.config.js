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
      new ExtractTextPlugin('../styles/styles.css'),
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
          loaders: ['babel-loader'],
          exclude: /(node_modules)/,
        },
        {
          test: /\.css$/,
          use: ['css-hot-loader'].concat(ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: [
              {
                loader: 'css-loader',
                options: {
                  importLoaders: 1,
                  modules: true,
                  sourceMap: true,
                  localIdentName: '[local]--[hash:base64:5]',
                },
              },
              'postcss-loader',
            ],
          })),
        },
      ],
    },
    devtool: 'cheap-module-eval-source-map'
  }
};
