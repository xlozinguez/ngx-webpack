'use strict';

let TslintRunner = require('tslint/lib/runner').Runner;

let options = {
  files: [ 'src/**/*.ts' ],
  fix: false,
  force: false,
  format: 'prose',
  init: false,
  typeCheck: false,
  version: false
};
new TslintRunner(options, process.stdout)
  .run(function (status) { return process.exit(status); });
