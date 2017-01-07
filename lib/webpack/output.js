'use strict';

let path = require('path');

module.exports = function({ outputDir }) {
  return {
    path: path.join(process.cwd(), outputDir),
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].bundle.js.map',
    chunkFilename: '[id].chunk.js'
  };
};
