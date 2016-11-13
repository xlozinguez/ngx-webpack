'use strict';

let path = require('path');
let fs = require('fs');

class ResolveFile {
  static getWebpackConfig() {
    let webpackConfigPath = path.resolve(process.cwd(), 'webpack.config.js');

    if (fs.existsSync(webpackConfigPath)) {
      return require(webpackConfigPath);
    }

    webpackConfigPath = path.resolve(__dirname, '..', '..', 'webpack.config.js');
    return require(webpackConfigPath);
  }

  static getKarmaConfigPath() {
    let karmaConfigPath = path.resolve(process.cwd(), 'karma.conf.js');

    if (fs.existsSync(karmaConfigPath)) {
      return karmaConfigPath;
    }

    karmaConfigPath = path.resolve(__dirname, '..', '..', 'karma.conf.js');
    return require(karmaConfigPath);
  }
}

module.exports = ResolveFile;
