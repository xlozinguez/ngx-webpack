'use strict';

class Config {
  constructor() {
    this._npmLifecycleEvent = process.env.npm_lifecycle_event || '';
    this._environment = process.env.NODE_ENV || '';
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
      staticFiles: options.staticFiles,
      aot: options.aot,
      travis: !!process.env.TRAVIS
    };
  }

  _isSingleRun(options) {
    return this._npmLifecycleEvent === 'test'
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
}

module.exports = Config;
