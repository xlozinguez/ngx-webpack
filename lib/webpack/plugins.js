'use strict';

let path = require('path');
let webpack = require('webpack');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

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
  new ForkCheckerPlugin()
];

module.exports = function({ env, staticFiles = [] }) {
  if (env === 'test') {
    return commonPlugins.concat([
      new webpack.LoaderOptionsPlugin({
        debug: true,
        minimize: false,
        htmlLoader: {
          attrs: false
        }
      })
    ]);
  } else if (env === 'production') {
    return commonPlugins.concat(displayPlugins, [
      new webpack.LoaderOptionsPlugin({
        debug: false,
        minimize: true,
        htmlLoader: {
          attrs: false,
          minimize: true,
          removeAttributeQuotes: false,
          caseSensitive: true,
          customAttrSurround: [
            [/#/, /(?:)/],
            [/\*/, /(?:)/],
            [/\[?\(?/, /(?:)/]
          ],
          customAttrAssign: [/\)?\]?=/]
        }
      }),
      // new webpack.optimize.DedupePlugin(), #issue https://github.com/webpack/webpack/issues/2644
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true,
        mangle: { screw_ie8 : true },
        compress: {
          screw_ie8: true,
          warnings: false
        }
      }),
      new CopyWebpackPlugin([
        { from: 'index.html' },
        { from: 'favicon.ico' }
      ].concat(staticFiles))
    ]);
  } else {
    return commonPlugins.concat(displayPlugins, [
      new webpack.LoaderOptionsPlugin({
        debug: true,
        minimize: false,
        htmlLoader: {
          attrs: false
        }
      })
    ]);
  }
};
