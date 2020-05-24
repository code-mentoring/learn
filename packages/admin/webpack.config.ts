import 'webpack-dev-server';

// import Copy from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HTMLWebpack from 'html-webpack-plugin';
import { Configuration } from 'webpack';

const PostCSSConfig = require('@codement/ui/postcss.config');

// const favicon = require('favicons-webpack-plugin');
const replacePlugin = require('webpack-plugin-replace');
const copyPlugin = require('copy-webpack-plugin');

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
    historyApiFallback: true,
    port: 9000
  },

  module: {
    rules: [
      { test: /\.ts/, loader: 'ts-loader' },
      // Allow importing of .module.css files into Typescript directly to get class nammes
      {
        test: /\.module.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development'
            }
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true
            }
          },
          { loader: 'postcss-loader', options: PostCSSConfig }
        ]
      },
      // General CSS
      {
        test: /\.css$/,
        exclude: /\.module.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development'
            }
          },
          'css-loader',
          { loader: 'postcss-loader', options: PostCSSConfig }
        ]
      },
      { test: /\.html/, loader: 'html-loader' },
      { test: /\.png/, loader: 'url-loader' },
      { test: /\.svg/, loader: 'react-svg-loader' },
      { test: /\.gql/, loader: 'graphql-tag/loader' }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: !isProd ? '[name].css' : '[name].[hash].css',
      chunkFilename: !isProd ? '[id].css' : '[id].[hash].css'
    }),
    new HTMLWebpack({
      template: './src/index.html'
    }),
    new replacePlugin({
      values: {
        '%%API_HOST%%': isProd ? 'https://api.codementoring.co' : 'http://localhost:4000',
        '%%IS_PROD%%': isProd
      }
    }),
    new copyPlugin([{ from: './_redirects', to: './' }])
  ]

};

// tslint:disable-next-line
export default config;
