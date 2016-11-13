'use strict';

let ResolveFile = require('./lib/bin/resolve-file');
let karmaConfig = require('./').karma(ResolveFile.getWebpackConfig());

module.exports = (config) => {
  config.set(karmaConfig);
};
