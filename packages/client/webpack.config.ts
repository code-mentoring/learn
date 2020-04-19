import 'webpack-dev-server';

// import Copy from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HTMLWebpack from 'html-webpack-plugin';
import { Configuration } from 'webpack';

// const favicon = require('favicons-webpack-plugin');
const replacePlugin = require('webpack-plugin-replace');

const isProd = process.env.NODE_ENV === 'production';
console.log(process.env.NODE_ENV);


const config: Configuration = {
  entry: ['./src/index.tsx'],

  resolve: {
    extensions: ['.ts', '.js', '.tsx', '.gql']
  },

  output: {
    publicPath: './'
  },

  devServer: {
    historyApiFallback: true
  },

  module: {
    rules: [
      { test: /\.ts/, loader: 'ts-loader' },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require("postcss-import"),
                  require("postcss-mixins"),
                  require("tailwindcss"),
                  require("autoprefixer"),
                  require("postcss-nested")
                ];
              }
            }
          }
        ],
      },
      // {
      //   test: /\.css/,
      //   loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader!postcss-loader' })

      //   use: [

      //     MiniCssExtractPlugin.loader,
      //     'css-loader',
      //     'postcss-loader'
      //     // {
      //     //   loader: ,
      //     //   options: {
      //     //     ident: 'postcss',
      //     //     plugins: [
      //     //       require('tailwindcss'),
      //     //       require('autoprefixer'),
      //     //     ],
      //     //   },
      //     // },
      //   ],
      // },
      { test: /\.html/, loader: 'html-loader' },
      { test: /\.png/, loader: 'url-loader' },
      { test: /\.svg/, loader: 'react-svg-loader' },
      { test: /\.gql/, loader: 'graphql-tag/loader' }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: !isProd ? '[name].css' : '[name].[hash].css',
      chunkFilename: !isProd ? '[id].css' : '[id].[hash].css',
    }),
    new HTMLWebpack({
      template: './src/index.html'
    }),
    new replacePlugin({
      values: {
        '%%API_HOST%%': isProd ? 'https://api.codementoring.co' : 'http://localhost:4000',
        '%%IS_PROD%%': isProd
      }
    })
  ]

};

// tslint:disable-next-line
export default config;
