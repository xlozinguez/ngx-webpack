'use strict';

let minimist = require('minimist');
let defaultConfig = require('./default');

class Config {
  constructor() {
    this._npmLifecycleEvent = process.env.npm_lifecycle_event || '';
    this._environment = process.env.NODE_ENV || '';
    this._argv = minimist(process.argv.slice(2));
  }

  calculate(options = {}) {
    let singleRun = this._isSingleRun(options);
    let env = 'development';

    if (this._isProduction(options)) {
      env = 'production';
    } else if (this._isTest(options)) {
      env = 'test';
    }

    return {
      env, singleRun,
      port: options.port || defaultConfig.port,
      staticFiles: options.staticFiles || defaultConfig.staticFiles,
      outputDir: options.outputDir || defaultConfig.outputDir,
      templateFormat: options.templateFormat || defaultConfig.templateFormat,
      styleFormat: options.styleFormat || defaultConfig.styleFormat,
      aot: this._isAot(options),
      travis: !!process.env.TRAVIS
    };
  }

  _isSingleRun(options) {
    return this._npmLifecycleEvent === 'test'
      || this._argv.singleRun
      || !!process.env.SINGLE_RUN
      || options.singleRun === true;
  }

  _isProduction(options) {
    return this._npmLifecycleEvent === 'build'
      || this._environment === 'production'
      || options.environment === 'production';
  }

  _isTest(options) {
    return this._npmLifecycleEvent.indexOf('test') !== -1
      || this._environment === 'test'
      || options.environment === 'test';
  }

  _isAot(options) {
    return this._argv.aot
      || !!process.env.AOT
      || options.aot;
  }
}

module.exports = Config;
