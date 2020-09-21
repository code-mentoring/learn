
import { Configuration } from 'webpack';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import merge from 'webpack-merge';
import common from './common';

const CopyPlugin = require('copy-webpack-plugin');


const ReplacePlugin = require('webpack-plugin-replace');

const plugins = [];
if (process.env.CI) {
  console.log('Running CI. Skipping BundleAnalyzerPlugin');

} else {
  plugins.push(
    new BundleAnalyzerPlugin({
      analyzerMode: 'static'
    }),
    new ReplacePlugin({ values: { '%%IS_PROD%%': true } }),
    new CopyPlugin([{ from: './_redirects', to: './' }])
  );
}

export default merge(common, {
  mode: 'production',
  plugins
}) as Configuration;
