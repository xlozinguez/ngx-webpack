'use strict';

let path = require('path');

module.exports = function(webpackConfig, { singleRun }) {
  return {
    basePath: process.cwd(),

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

    logLevel: 'INFO',

    browsers: ['PhantomJS'],

    autoWatch: !singleRun,
    singleRun: singleRun
  };
};
