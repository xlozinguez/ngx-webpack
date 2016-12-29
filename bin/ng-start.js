#! /usr/bin/env node
'use strict';

process.env.NODE_ENV = 'development';
let WebpackDevServer = require('webpack-dev-server');
let webpack = require('webpack');
let ResolveFile = require('../lib/bin/resolve-file');

let webpackConfig = ResolveFile.getWebpackConfig();
let compiler = webpack(webpackConfig);

console.log('> webpack-dev-server');
let server = new WebpackDevServer(compiler, webpackConfig.devServer);
server.listen(webpackConfig.devServer.port);
