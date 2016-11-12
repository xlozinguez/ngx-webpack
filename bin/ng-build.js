#! /usr/bin/env node
'use strict';

process.env.NODE_ENV = 'production';
let path = require('path');
let webpack = require('webpack');
let ngcRun = require('./lib/ngc');
let Config = require('../lib/config');

let config = new Config().calculate();

if (config.aot) {
  ngcRun();
}

console.log('> webpack');
let webpackConfigPath = path.resolve(process.cwd(), 'webpack.config.js');
let webpackConfig = require(webpackConfigPath);
let compiler = webpack(webpackConfig);

compiler.run((e) => {
  if (e) {
    console.error(e);
    process.exit(1);
  }
});
