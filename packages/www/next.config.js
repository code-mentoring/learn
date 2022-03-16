/* eslint-disable no-param-reassign */
const path = require('path');

const workspace = path.join(__dirname, '..');
module.exports = {
  poweredByHeader: false,
  webpack: (config, options) => {
    /** Allows import modules from packages in workspace. */
    config.module = {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /\.(js|jsx|ts|tsx)$/,
          include: [workspace],
          exclude: /node_modules/,
          use: options.defaultLoaders.babel
        },
        { test: /\.svg$/, use: 'react-svg-loader' },
        {
          test: /\/ui\/lib\/history.ts/,
          use: 'null-loader'
        }
      ]
    };
    return config;
  }
};
