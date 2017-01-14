'use strict';

let path = require('path');
let webpack = require('webpack');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
let ngtools = require('@ngtools/webpack');

let displayPlugins = [
  new webpack.optimize.CommonsChunkPlugin({ name: ['main', 'vendor'], minChunks: Infinity }),
  new ExtractTextPlugin('style.bundle.css'),
  new CheckerPlugin()
];

module.exports = function(config) {
  let loaderOptions = require('./plugins/loader-options')(config);

  let plugins = [
    new webpack.ProgressPlugin(),
    new webpack.ContextReplacementPlugin(
      // The (\\|\/) piece accounts for path separators in *nix and Windows
      /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
      path.join(process.cwd(), 'src')
    ),
    new webpack.LoaderOptionsPlugin(loaderOptions)
  ];

  if (config.env === 'test') {
    return plugins;
  }

  plugins = plugins.concat(displayPlugins);

  if (config.aot) {
    plugins.push(new ngtools.AotPlugin({
      tsConfigPath: path.join(process.cwd(), 'tsconfig.json'),
      entryModule: path.join(process.cwd(), 'src/app/modules/main.module#MainModule')
    }));
  }

  if (config.env === 'production') {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      mangle: { screw_ie8 : true },
      compress: {
        screw_ie8: true,
        warnings: false
      },
      comments: false
    }));

    if (config.staticFiles && config.staticFiles.length) {
      plugins.push(new CopyWebpackPlugin(config.staticFiles));
    }
  }

  return plugins;
};
