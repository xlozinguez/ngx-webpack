#! /usr/bin/env node
'use strict';

process.env.NODE_ENV = 'test';
let path = require('path');
let Server = require('karma').Server;
let ResolveFile = require('../lib/bin/resolve-file');

console.log('> karma start');
let server = new Server(
  { configFile: ResolveFile.getKarmaConfigPath() }, (errorCode) => {
    if (errorCode) {
      console.log(`> karma error code: ${errorCode}`);
      process.exit(errorCode);
    }
  }
);

server.start();
