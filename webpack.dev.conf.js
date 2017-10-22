const webpackConfig = require('./webpack.conf');
const webpack = require('webpack');

module.exports = {
  ...webpackConfig,
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './public',
    hot: true
  },
  plugins: [
    ...webpackConfig.plugins,
    new webpack.HotModuleReplacementPlugin()
  ]
};
