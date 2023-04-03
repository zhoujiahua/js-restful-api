const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 0,
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'package.json'), // 源文件路径
          to: path.resolve(__dirname, 'dist'), // 目标文件夹路径
        },
        {
          from: path.resolve(__dirname, 'src/public'), // 源文件夹路径
          to: path.resolve(__dirname, 'dist/public'), // 目标文件夹路径
        },
        {
          from: path.resolve(__dirname, 'src/api-docs'), // 源文件夹路径
          to: path.resolve(__dirname, 'dist/api-docs'), // 目标文件夹路径
        }
      ],
    }),
  ],
  resolve: {
    alias: {},
  },
};
