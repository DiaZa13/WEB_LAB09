const HtmlWebpackPlugin = require('html-webpack-plugin');
const rules = require('./rules');

module.exports = {
  entry: {
    index: './src/index.jsx',
  },

  module: {
    rules,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
};
