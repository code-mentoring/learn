import 'webpack-dev-server';

import HTMLWebpack from 'html-webpack-plugin';
import { Configuration } from 'webpack';

const config: Configuration = {
  entry: ['./styleguide/index.tsx'],

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
    new HTMLWebpack({
      template: './styleguide/index.html'
    })
  ]

};

// tslint:disable-next-line
export default config;
