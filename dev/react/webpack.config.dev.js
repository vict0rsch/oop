var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    // 'webpack-hot-middleware/app',
    './app/oop'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [
    // js
    {
      test: /\.jsx?$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'app')
    },
    // CSS
    { 
      test: /\.css$/, 
      include: path.join(__dirname, 'app'),
      loader: 'style-loader!css-loader!stylus-loader'
    }
    ]
  }
};
