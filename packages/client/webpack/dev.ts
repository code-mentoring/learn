
import { Configuration } from 'webpack';
import merge from 'webpack-merge';
import common from './common';

const ReplacePlugin = require('webpack-plugin-replace');

export default merge(common, {
  // @ts-ignore
  devServer: {
    historyApiFallback: true
  },
  devtool: 'cheap-module-eval-source-map',

  plugins: [
    new ReplacePlugin({ values: { '%%IS_PROD%%': false } })
  ]

}) as Configuration;
