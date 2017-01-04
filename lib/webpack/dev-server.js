'use strict';

module.exports = function({ port }) {
  return {
    contentBase: './src',
    port,
    inline: true,
    historyApiFallback: true,
    stats: 'errors-only',
    watchOptions: {
      aggregateTimeout: 300,
      poll: 500
    }
  };
};

