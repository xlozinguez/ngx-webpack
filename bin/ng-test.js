#! /usr/bin/env node
'use strict';

process.env.NODE_ENV = 'test';
let path = require('path');
let Server = require('karma').Server;

let karmaConfigPath = path.resolve(process.cwd(), 'karma.conf.js');

console.log('> karma start');
let server = new Server(
  { configFile: karmaConfigPath }, (errorCode) => {
    if (errorCode) {
      console.log(`> karma error code: ${errorCode}`);
      process.exit(errorCode);
    }
  }
);

server.start();
