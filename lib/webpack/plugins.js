'use strict';

let path = require('path');
let webpack = require('webpack');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
let ngtools = require('@ngtools/webpack');

let commonPlugins = [
  new webpack.ProgressPlugin(),
  new webpack.ContextReplacementPlugin(
    // The (\\|\/) piece accounts for path separators in *nix and Windows
    /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
    path.join(process.cwd(), 'src')
  )
];

let displayPlugins = [
  new webpack.optimize.CommonsChunkPlugin({ name: ['main', 'vendor'], minChunks: Infinity }),
  new ExtractTextPlugin('style.bundle.css'),
  new CheckerPlugin()
];

module.exports = function({ env, aot, staticFiles = [] }) {
  if (env === 'test') {
    return commonPlugins.concat([
      new webpack.LoaderOptionsPlugin({
        debug: true,
        minimize: false
      })
    ]);
  }

  let aotPlugins = aot
    ? [
      new ngtools.AotPlugin({
        tsConfigPath: path.join(process.cwd(), 'tsconfig.json')
      })
    ]
    : [];

  if (env === 'production') {
    let additionalPlugins = [
      new webpack.LoaderOptionsPlugin({
        debug: false,
        minimize: true
      }),
      // new webpack.optimize.DedupePlugin(), #issue https://github.com/webpack/webpack/issues/2644
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        mangle: { screw_ie8 : true },
        compress: {
          screw_ie8: true,
          warnings: false
        },
        comments: false
      })
    ];
    if (staticFiles.length) {
      additionalPlugins.push(new CopyWebpackPlugin(staticFiles));
    }

    return commonPlugins.concat(displayPlugins, aotPlugins, additionalPlugins);
  } else {
    return commonPlugins.concat(displayPlugins, aotPlugins, [
      new webpack.LoaderOptionsPlugin({
        debug: true,
        minimize: false
      })
    ]);
  }
};
