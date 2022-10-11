const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const plugins = [];
if (process.env.NODE_ENV === 'development') {
  plugins.push('react-refresh/babel');
}

if (process.env.SERVE) {
  plugins.push(new ReactRefreshWebpackPlugin());
}

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: ['@babel/polyfill', './index.js'],
  output: {
    filename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    new CleanWebpackPlugin(),
  ],
  devServer: {
    port: 4200,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
};
