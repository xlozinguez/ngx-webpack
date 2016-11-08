'use strict';

let path = require('path');

module.exports = function(options) {
  let entry = require('./entry')(options);
  let output = require('./output');
  let rules = require('./rules')(options);
  let plugins = require('./plugins')(options);
  let devtool = require('./devtool')(options);
  let devServer = require('./dev-server');

  let webpackConfig = {
    context: path.join(process.cwd(), 'src'),

    resolve: require('./resolve'),

    stats: require('./stats'),

    node: require('./node'),

    plugins,

    module: { rules },

    devtool
  };

  if (options.env === 'production') {
    return Object.assign({ entry, output }, webpackConfig);
  } else if (options.env === 'test') {
    return webpackConfig;
  } else {
    return Object.assign({ entry, output, devServer }, webpackConfig);
  }
};
