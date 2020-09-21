
import { Configuration } from 'webpack';
import HTMLPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const Favicon = require('favicons-webpack-plugin');
const ReplacePlugin = require('webpack-plugin-replace');

export default {
  entry: './src/index.tsx',
  output: {
    filename: '[hash].js',
    chunkFilename: '[chunkhash].js',
    publicPath: '/'
  },

  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.gql', '.css']
  },

  module: {
    rules: [
      {
        test: /\.(ts|tsx)/,
        loaders: [{
          loader: 'babel-loader',
          options: {
            rootMode: 'upward'
          }
        }]
      },

      { test: /\.html/, loader: 'html-loader' },

      { test: /\.png/, loader: 'url-loader' },

      {
        test: /\.svg/,
        loader: 'react-svg-loader',
        options: {
          svgo: {
            plugins: [
              { removeViewBox: false, cleanupIDs: false }
            ],
            floatPrecision: 2
          }
        }
      },

      { test: /\.gql/, loader: 'graphql-tag/loader' },

      {
        test: /\.(mp3|wav)$/,
        loader: 'file-loader',
        query: { name: 'static/media/[name].[hash:8].[ext]' }
      }
    ]
  },

  plugins: [
    new HTMLPlugin({ template: './src/index.html' }),
    new CleanWebpackPlugin(),
    new ReplacePlugin({
      values: {
        '%%API_HOST%%': process.env.API_HOST || 'http://localhost:4000'
      }
    }),
    new Favicon('../ui/images/favicon.jpg')
  ]
} as Configuration;
