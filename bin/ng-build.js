#! /usr/bin/env node
'use strict';

process.env.NODE_ENV = 'production';
let webpack = require('webpack');
let ngcRun = require('./lib/ngc');
let Config = require('../lib/config');
let ResolveFile = require('../lib/bin/resolve-file');

let config = new Config().calculate();

if (config.aot) {
  ngcRun();
}

console.log('> webpack');
let webpackConfig = ResolveFile.getWebpackConfig();
let compiler = webpack(webpackConfig);

compiler.run((e) => {
  if (e) {
    console.error(e);
    process.exit(1);
  }
});
