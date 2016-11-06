'use strict';

module.exports = function(options) {
  if (options.env === 'test') {
    return 'inline-source-map';
  } else if (options.env === 'production') {
    return 'source-map';
  } else {
    return 'cheap-module-source-map';
  }
};
