const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPugPlugin = require('html-webpack-pug-plugin');

const extractSass = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
  disable: process.env.NODE_ENV !== 'production'
});

module.exports = {
  entry: {
    app: './vue/app.js',
    vendor: './vue/vendor.js'
  },
  output: {
    filename: '[name].bundle.js',
    publicPath: process.env.NODE_ENV === 'production' ? '/' : 'http://localhost:8080',
    path: path.resolve(__dirname, 'public')
  },
  node: {
    fs: 'empty',
    tls: 'empty',
    net: 'empty',
  },
  module: {
    rules: [
      {test: /\.txt$/, use: 'raw-loader'},
      {
        test: /\.scss|\.sass$/,
        use: extractSass.extract({
          use: [{
            loader: 'css-loader'
          }, {
            loader: 'sass-loader'
          }],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ],
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filetype: 'pug',
      filename: 'layout.pug',
      template: 'views/layout.pug'
    }),
    new HtmlWebpackPugPlugin(),
    extractSass,
  ]
};
