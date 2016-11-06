'use strict';

let webpackGenerator = require('./config/webpack');
let karmaGenerator = require('./config/karma');

let npmLifecycleEvent = process.env.npm_lifecycle_event || '';
let environment = process.env.NODE_ENV || '';
let singleRun = npmLifecycleEvent === 'test';
let env = 'development';
if (npmLifecycleEvent === 'build' || environment === 'production') {
  env = 'production';
} else if (npmLifecycleEvent.indexOf('test') !== -1 || environment === 'test') {
  env = 'test';
}

let options = {
  env, singleRun
};

module.exports = {
  webpack: function() {
    return webpackGenerator(options);
  },
  karma: function(webpackConfig) {
    return karmaGenerator(webpackConfig, options);
  }
};
