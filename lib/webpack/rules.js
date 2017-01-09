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

let appDir = path.resolve(process.cwd(), 'src', 'app');

module.exports = function({ env, aot, templateFormat, styleFormat }) {
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

  let extractStyleRule;
  if (styleFormat === 'css') {
    rules.push({
      test: /\.css$/,
      include: appDir,
      loaders: ['to-string-loader', 'css-loader']
    });

    extractStyleRule = {
      test: /\.css$/,
      exclude: appDir,
      loader: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: ['css-loader']
      })
    };
  } else {
    let loaderName = (styleFormat === 'scss' ? 'sass' : styleFormat);
    let stylePattern = new RegExp(`\.${styleFormat}$`);

    rules.push({
      test: stylePattern,
      include: appDir,
      loaders: ['to-string-loader', 'css-loader', `${loaderName}-loader`]
    });

    extractStyleRule = {
      test: stylePattern,
      exclude: appDir,
      loader: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: ['css-loader', `${loaderName}-loader`]
      })
    };
  }

  if (env === 'test') {
    return rules.concat([typescriptRule]);
  }

  if (aot) {
    return rules.concat([typescriptAotRule, extractStyleRule]);
  }

  return rules.concat([typescriptRule, extractStyleRule]);
};
