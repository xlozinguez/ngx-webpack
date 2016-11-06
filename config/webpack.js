'use strict';

let commonConfig = require('./webpack.common');
let webpack = require('webpack');
let merge = require('webpack-merge');
let CopyWebpackPlugin = require('copy-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
let path = require('path');

let commonPlugins = [
  new webpack.optimize.CommonsChunkPlugin({ name: ['main', 'vendor'], minChunks: Infinity }),
  new ExtractTextPlugin('style.bundle.css'),
  new ForkCheckerPlugin()
];
let cssLoader = {
  test: /\.css$/,
  exclude: path.resolve(process.cwd(), 'src', 'app'),
  loader: ExtractTextPlugin.extract({
    fallbackLoader: 'style-loader',
    loader: 'css-loader'
  })
};
let entry = {
  main: './app/main.ts',
  vendor: './app/vendor.ts'
};
let output = {
  path: path.join(process.cwd(), 'dist'),
  filename: '[name].bundle.js',
  sourceMapFilename: '[name].map',
  chunkFilename: '[id].chunk.js'
};

module.exports = function(options) {
  if (options.env === 'production') {
    return merge.smart(commonConfig, {
      entry: entry,
      output: output,

      plugins: commonPlugins.concat([
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
        ])
      ]),

      module: {
        rules: [cssLoader]
      },

      devtool: 'source-map'
    });
  } else if (options.env === 'test') {
    return merge.smart(commonConfig, {
      plugins: [
        new webpack.LoaderOptionsPlugin({
          debug: true,
          minimize: false,
          htmlLoader: {
            attrs: false
          }
        })
      ],

      devtool: 'inline-source-map'
    });
  } else {
    return merge.smart(commonConfig, {
      entry: entry,
      output: output,

      plugins: commonPlugins.concat([
        new webpack.LoaderOptionsPlugin({
          debug: true,
          minimize: false,
          htmlLoader: {
            attrs: false
          }
        })
      ]),

      module: {
        rules: [cssLoader]
      },

      devServer: {
        contentBase: './src',
        port: 3000,
        inline: true,
        historyApiFallback: true,
        stats: 'errors-only',
        watchOptions: {
          aggregateTimeout: 300,
          poll: 500
        }
      },

      devtool: 'cheap-module-source-map'
    });
  }
};
