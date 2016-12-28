'use strict';

let childProcess = require('child_process');

let binPath = childProcess.execSync('npm bin', {
  encoding: 'utf8',
  cwd: process.cwd()
});
let ngcCommand = 'ngc';
let fullCommand = binPath.trim() + '/' + ngcCommand;

module.exports = function() {
  console.log(`> ${ngcCommand}`);
  childProcess.execSync(fullCommand, {
    encoding: 'utf8',
    cwd: process.cwd()
  });
};
