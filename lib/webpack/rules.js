'use strict';

let path = require('path');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

let commonRules = [
  {
    test: /\.ts/,
    use: [
      'awesome-typescript',
      'angular2-template',
      'angular2-router'
    ]
  },
  {
    test: /\.ts$/,
    enforce: 'pre',
    exclude: [
      /ngfactory/, /shim/
    ],
    loader: 'tslint'
  },
  {
    test: /\.js$/,
    loader: 'source-map',
    exclude: [
      path.join(process.cwd(), 'node_modules/rxjs'),
      path.join(process.cwd(), 'node_modules/@angular')
    ]
  },
  {
    test: /\.css$/,
    include: path.resolve(process.cwd(), 'src', 'app'),
    loaders: ['to-string-loader', 'css-loader']
  },
  {
    test: /\.html$/,
    loader: 'html?attrs=false&caseSensitive&removeAttributeQuotes=false'
  },
  {
    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'url?limit=10000&mimetype=application/font-woff'
  },
  {
    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'file'
  }
];

let extractStyleRule = {
  test: /\.css$/,
  exclude: path.resolve(process.cwd(), 'src', 'app'),
  loader: ExtractTextPlugin.extract({
    fallbackLoader: 'style-loader',
    loader: 'css-loader'
  })
};

module.exports = function({ env }) {
  if (env === 'test') {
    return commonRules;
  } else {
    return commonRules.concat([extractStyleRule]);
  }
};
