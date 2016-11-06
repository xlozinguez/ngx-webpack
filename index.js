'use strict';

let webpackGenerator = require('./lib/webpack');
let karmaGenerator = require('./lib/karma');
let Config = require('./lib/config');

let config = new Config();

module.exports = {
  webpack: function(options) {
    return webpackGenerator(config.calculate(options));
  },
  karma: function(webpackConfig, options) {
    return karmaGenerator(webpackConfig, config.calculate(options));
  }
};
