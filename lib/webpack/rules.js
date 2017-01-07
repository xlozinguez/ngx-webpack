'use strict';

let path = require('path');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

let typescriptRule = {
  test: /\.ts/,
  loaders: [
    'awesome-typescript-loader',
    'angular2-template-loader',
    'angular2-router-loader'
  ]
};

let typescriptAotRule = {
  test: /\.ts/,
  loaders: ['@ngtools/webpack']
};

let extractStyleRule = {
  test: /\.css$/,
  exclude: path.resolve(process.cwd(), 'src', 'app'),
  loader: ExtractTextPlugin.extract({
    fallbackLoader: 'style-loader',
    loader: 'css-loader'
  })
};

module.exports = function({ env, aot, templateFormat }) {
  let rules = [
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
      test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'url-loader',
      query: {
        limit: 10000,
        mimetype: 'application/font-woff'
      }
    },
    {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader'
    }
  ];

  if (templateFormat === 'html') {
    rules.push({
      test: /\.html$/,
      loaders: ['html-loader']
    });
  } else {
    rules.push({
      test: new RegExp(`\.${templateFormat}$`),
      loaders: ['apply-loader', `${templateFormat}-loader`]
    });
  }

  if (env === 'test') {
    return rules.concat([typescriptRule]);
  }

  if (aot) {
    return rules.concat([typescriptAotRule, extractStyleRule]);
  }

  return rules.concat([typescriptRule, extractStyleRule]);
};
