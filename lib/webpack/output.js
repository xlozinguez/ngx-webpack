'use strict';

let path = require('path');

module.exports = {
  path: path.join(process.cwd(), 'dist'),
  filename: '[name].bundle.js',
  sourceMapFilename: '[name].bundle.js.map',
  chunkFilename: '[id].chunk.js'
};
