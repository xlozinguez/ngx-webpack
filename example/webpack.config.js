'use strict';

let webpackConfig = require('./').webpack({
  port: 3000
});
webpackConfig.module.rules.push({
  test: /\.png$/,
  loader: 'file-loader'
});

module.exports = webpackConfig;
