const path = require('path');
const webpack = require('webpack');

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
      path: path.resolve(__dirname, 'public'),
      filename: 'bundle.js',
      publicPath: '/',
    },
    resolve: {
      modules: [
        'node_modules',
        './app/components',
      ],
      alias: {
        // RecipesApp: path.resolve(__dirname, 'app/components/RecipesApp.jsx'),
        // RecipesBrowse: path.resolve(__dirname, 'app/components/RecipesBrowse.jsx'),
        // RecipesDetail: path.resolve(__dirname, 'app/components/RecipesDetail.jsx'),
      },
      extensions: ['.json', '.js', '.jsx'],
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
    ],
    devServer: {
      host: 'localhost',
      port: 3000,
      hot: true,
      contentBase: './public',
      publicPath: '/',
    },
    module: {
      loaders: [
        {
          loaders: ['babel-loader'],
          test: /\.jsx?$/,
          exclude: /node_modules/,
        },
        {
          loaders: ['style', 'css-loader?modules', 'postcss-loader'],
          test: /\.css?$/,
        }
      ],
    },
    devtool: 'cheap-module-eval-source-map'
  }
};
