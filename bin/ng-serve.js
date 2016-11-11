'use strict';

let path = require('path');
let chokidar = require('chokidar');
let WebpackDevServer = require("webpack-dev-server");
let webpack = require("webpack");

let ngcRun = require('./lib/ngc');

chokidar.watch(
  ['**/*.component.ts', '**/*.template.html', '**/*.style.css'],
  {
    cwd: path.resolve(process.cwd(), 'src', 'app'),
    ignoreInitial: true
  }
).on('all', () => ngcRun());

let webpackConfigPath = path.resolve(process.cwd(), 'webpack.config.js');
let webpackConfig = require(webpackConfigPath);
let compiler = webpack(webpackConfig);

let server = new WebpackDevServer(compiler, webpackConfig.devServer);
server.listen(webpackConfig.devServer.port);
