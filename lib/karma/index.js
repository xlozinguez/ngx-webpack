'use strict';

let path = require('path');

module.exports = function(webpackConfig, { singleRun, travis }) {
  return function(config) {
    let karmaConfig = {
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

      browsers: ['Chrome'],
      // browsers: ['PhantomJS'], // for headless testing

      customLaunchers: {
        Chrome_travis_ci: {
          base: 'Chrome',
          flags: ['--no-sandbox']
        }
      },

      autoWatch: !singleRun,
      singleRun: singleRun
    };

    if (travis) {
      karmaConfig.browsers = ['Chrome_travis_ci'];
    }

    config.set(karmaConfig);
  };
};
