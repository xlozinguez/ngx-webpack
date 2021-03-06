# ngx-webpack
[![Build Status](https://travis-ci.org/blacksonic/ngx-webpack.svg?branch=master)](https://travis-ci.org/blacksonic/ngx-webpack)
[![Dependency Status](https://david-dm.org/blacksonic/ngx-webpack.svg)](https://david-dm.org/blacksonic/ngx-webpack)
[![devDependency Status](https://david-dm.org/blacksonic/ngx-webpack/dev-status.svg)](https://david-dm.org/blacksonic/ngx-webpack?type=dev)

An opinionated configuration generator for your Angular 2 environment.
Generates customizable Webpack 2, Karma and Tslint configurations.

### Installation

```
npm install ngx-webpack --save-dev // adds build configuration
$(npm bin)/ng-init // scaffolds basic application
npm install // install Angular dependencies
```

### Usage

Create ```webpack.config.js```.

```
'use strict';
module.exports = require('ngx-webpack').webpack();
```

Create ```karma.conf.js```.

```
'use strict';
module.exports = require('ngx-webpack').karma(
  require('./webpack.config')
);
```

Setup ```package.json``` scripts.

```
"scripts": {
  "start": "ng-start",
  "test": "ng-test"
}
```

After this the application can be run with ```npm start```
and will be available on [http://localhost:3000](http://localhost:3000).

An example application is inside the ```src``` directory
and can be copied as is to try out the package.

### Outline

The setup consists of 3 entry points. All bundling is done with Webpack 2.
They have to be at the exact same location if you don't modify the config files.

- ```src/app/main.ts``` for main application logic and bootstrapping
- ```src/app/vendor.ts``` for vendor packages and common files
- ```src/app/test.ts``` for running test files

All files under the ```src``` directory will be publicly available.

After every modification to the source files, the page will be reloaded with the newly generated files.

### One configuration

The concept is to have one configuration file for Webpack and one for Karma.
Behind the scenes it decides based on environment variable(```process.env.NODE_ENV```), 
NPM lifecycle event(```process.env.npm_lifecycle_event```) or 
given option(```options.environment```) which mode to run.

- ```lifecycle == 'start'``` is development live-reload mode
- ```lifecycle == 'test'``` is testing single-run mode
- ```lifecycle == '*test*'``` is testing continuous-run mode
- ```lifecycle == 'build'``` is production single-run mode
- ```env|options.enviroment == 'development'``` is development live-reload mode
- ```env|options.enviroment == 'test' && options.singleRun``` is testing single-run mode
- ```env|options.enviroment == 'test'``` is testing continuous-run mode
- ```env|options.enviroment == 'production'``` is production single-run mode

### Loaders

Typescript files are translated with ```awesome-typescript-loader```.
Inside components ```styleUrls``` and ```templateUrl``` will be inlined with ```angular2-template-loader```.
When using ```loadChildren``` inside routing,
it will be moved to separate chunks with ```angular2-router-loader```.

Inside the ```src/app``` directory ```.css``` files will be required as strings to work with ```angular2-template-loader```.
Outside this directory they will be moved to a single file(```style.bundle.css```) with ```extract-text-plugin```.
Currently only CSS files are supported for stylesheets.
But if you want another format, just add it to ```modules.rules``` after the package generated the Webpack config.

Additional loaders are added for images and fonts to handle them inside stylesheets.

### Testing

For test running Jasmine is used in combination with Karma + PhantomJS browser.

Tests can be run with the ```npm test``` command.
It runs all files with ```*.spec.ts``` extension inside the ```src/app``` folder.
The test setup is done in ```src/app/test.ts```.

To run tests continuously add the following script: ```"scripts": { "test-watch": "ng-test --watch" }```.
It will speed up rebuilds and run the tests automatically after every change.

### Linting

Linting is done with Tslint and Codelyzer rules.
It is included as a pre-loader for Webpack.

Also an opinionated ruleset is exported based on ```tslint:recommended```. 

It's setup:

```
{
  "extends": "ngx-webpack/tslint.js"
}
```

### Deployment

After adding ```"scripts": { "build": "ng-build" }``` and running it, 
the generated files will appear in the ```dist``` folder. These are minified and ready for deployment.

Github Pages deployment can be done with ```"scripts": { "deploy": "ng-deploy" }```.

### AOT support

It can be enabled with the ```--aot``` flag for both starting and building the application.
```
"scripts": { 
  "start": "ng-start --aot" 
  "deploy": "ng-deploy --aot" 
}
```

Instead of the original endpoint ```src/app/main.ts``` it starts from ```src/app/main.aot.ts```.

### Example projects

- [Angular 2 PhoneCat](https://github.com/emartech/angular2-phonecat)
