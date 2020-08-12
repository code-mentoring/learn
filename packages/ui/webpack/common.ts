
import { Configuration } from 'webpack';
import HTMLPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const Favicon = require('favicons-webpack-plugin');

export default {
  entry: ['./styleguide/index.tsx'],
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
      { test: /\.ts/, loader: 'babel-loader' },
      {
        test: /\.mdx?$/,
        use: ['babel-loader', 'mdx-loader']
      },
      { test: /\.html/, loader: 'html-loader' },
      { test: /\.png/, loader: 'url-loader' },
      { test: /\.svg/, loader: 'react-svg-loader' }
    ]
  },

  plugins: [
    new HTMLPlugin({ template: './styleguide/index.html' }),
    new CleanWebpackPlugin(),
    new Favicon('./images/favicon.jpg')
  ]
} as Configuration;
