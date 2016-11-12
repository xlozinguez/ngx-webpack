#! /usr/bin/env node
'use strict';

let ghPages = require('gh-pages');
let path = require('path');
let fs = require('fs');

let noJekyllFile = path.resolve(process.cwd(), 'dist', '.nojekyll');
fs.closeSync(fs.openSync(noJekyllFile, 'w'));

console.log('> gh-pages -d dist');
ghPages.publish(path.resolve(process.cwd(), 'dist'),
  {
    dotfiles: true,
    logger: message => console.log(message)
  },
  (e) => {
    if (e) {
      console.error(e);
      process.exit(1);
    }
  }
);
