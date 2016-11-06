'use strict';

let path = require('path');

module.exports = function(webpackConfig, options) {
  return function(config) {
    config.set({
      basePath: '',

      frameworks: ['jasmine'],

      files: [
        { pattern: 'src/app/test.ts' }
      ],

      preprocessors: {
        'src/app/test.ts': ['webpack', 'sourcemap']
      },

      reporters: ['dots'],

      webpack: webpackConfig,
      webpackServer: { noInfo: true },

      port: 9876,

      colors: true,

      logLevel: config.LOG_INFO,

      browsers: ['PhantomJS'],

      autoWatch: !options.singleRun,
      singleRun: options.singleRun
    });
  };
};
