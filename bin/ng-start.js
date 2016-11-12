#! /usr/bin/env node
'use strict';

process.env.NODE_ENV = 'development';
let path = require('path');
let chokidar = require('chokidar');
let WebpackDevServer = require('webpack-dev-server');
let webpack = require('webpack');
let ngcRun = require('./lib/ngc');
let Config = require('../lib/config');

let config = new Config().calculate();

if (config.aot) {
  ngcRun();

  chokidar.watch(
    ['**/*.module.ts', '**/*.component.ts', '**/*.pipe.ts', '**/*.template.html', '**/*.style.css'],
    {
      cwd: path.resolve(process.cwd(), 'src', 'app'),
      ignoreInitial: true
    }
  ).on('all', () => ngcRun());
}

let webpackConfigPath = path.resolve(process.cwd(), 'webpack.config.js');
let webpackConfig = require(webpackConfigPath);
let compiler = webpack(webpackConfig);

console.log('> webpack-dev-server');
let server = new WebpackDevServer(compiler, webpackConfig.devServer);
server.listen(webpackConfig.devServer.port);
