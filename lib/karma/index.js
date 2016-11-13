'use strict';

let path = require('path');

module.exports = function(webpackConfig, { singleRun, travis }) {
  let karmaConfig = {
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

    browsers: ['Chrome'],
    // browsers: ['PhantomJS'], // for headless testing

    customLaunchers: {
      ChromeTravisCi: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    autoWatch: !singleRun,
    singleRun: singleRun
  };

  if (travis) {
    karmaConfig.browsers = ['ChromeTravisCi'];
  }

  return karmaConfig;
};
