'use strict';

module.exports = {
  contentBase: './src',
  port: 3000,
  inline: true,
  historyApiFallback: true,
  stats: 'errors-only',
  watchOptions: {
    aggregateTimeout: 300,
    poll: 500
  }
};

