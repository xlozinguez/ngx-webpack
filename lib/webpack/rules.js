'use strict';

let path = require('path');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

let typescriptRule = {
  test: /\.ts/,
  use: [
    'awesome-typescript-loader',
    'angular2-template-loader',
    'angular2-router-loader'
  ]
};

let typescriptAotRule = {
  test: /\.ts/,
  use: ['@ngtools/webpack']
};

let commonRules = [
  {
    test: /\.ts$/,
    enforce: 'pre',
    exclude: [
      /ngfactory/, /shim/
    ],
    loader: 'tslint-loader'
  },
  {
    test: /\.js$/,
    loader: 'source-map-loader',
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
    loader: 'html-loader?attrs=false&caseSensitive&removeAttributeQuotes=false'
  },
  {
    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'url-loader?limit=10000&mimetype=application/font-woff'
  },
  {
    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: 'file-loader'
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

module.exports = function({ env, aot }) {
  if (env === 'test') {
    return commonRules.concat([typescriptRule]);
  }

  if (aot) {
    return commonRules.concat([typescriptAotRule, extractStyleRule]);
  }

  return commonRules.concat([typescriptRule, extractStyleRule]);
};
