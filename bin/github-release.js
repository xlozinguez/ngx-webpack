#! /usr/bin/env node
'use strict';

let ghPages = require('gh-pages');
let path = require('path');
let fs = require('fs');

let noJekyllFile = path.resolve(process.cwd(), 'dist', '.nojekyll');
fs.closeSync(fs.openSync(noJekyllFile, 'w'));

ghPages.publish(path.resolve(process.cwd(), 'dist'),
  {
    dotfiles: true,
    logger: message => console.log(message)
  },
  (e) => {
    if (e) {
      console.log(`Error during deploy: ${e.message}`);
    } else {
      console.log('Published');
    }
  }
);
