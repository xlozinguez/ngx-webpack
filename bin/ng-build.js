#! /usr/bin/env node
'use strict';

process.env.NODE_ENV = 'production';
let webpack = require('webpack');
let ResolveFile = require('../lib/bin/resolve-file');

console.log('> webpack');
let webpackConfig = ResolveFile.getWebpackConfig();
let compiler = webpack(webpackConfig);

compiler.run((e) => {
  if (e) {
    console.error(e);
    process.exit(1);
  }
});
