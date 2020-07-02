import 'webpack-dev-server';

import HTMLWebpack from 'html-webpack-plugin';
import { Configuration } from 'webpack';


// const favicon = require('favicons-webpack-plugin');
const ReplacePlugin = require('webpack-plugin-replace');
const CopyPlugin = require('copy-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';


const config: Configuration = {
  entry: ['./src/index.tsx'],

  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.gql', '.css']
  },

  output: {
    publicPath: '/'
  },

  devServer: {
    historyApiFallback: true
  },

  module: {
    rules: [
      { test: /\.ts/, loader: 'ts-loader' },
      { test: /\.html/, loader: 'html-loader' },
      { test: /\.png/, loader: 'url-loader' },
      { test: /\.svg/, loader: 'react-svg-loader' },
      { test: /\.gql/, loader: 'graphql-tag/loader' }
    ]
  },

  plugins: [
    new HTMLWebpack({
      template: './src/index.html'
    }),
    new ReplacePlugin({
      values: {
        '%%API_HOST%%': isProd ? 'https://api.codementoring.co' : 'http://localhost:4000',
        '%%IS_PROD%%': isProd
      }
    }),
    new CopyPlugin([{ from: './_redirects', to: './' }])
  ]

};

// tslint:disable-next-line
export default config;
