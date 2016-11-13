#! /usr/bin/env node
'use strict';

let path = require('path');
let fsExtra = require('fs-extra');

let examplePath = path.resolve(__dirname, '..', 'example');
let exampleAppPath = path.resolve(__dirname, '..', 'src');
let destinationPath = path.resolve(process.cwd(), 'generated');
let destinationAppPath = path.resolve(process.cwd(), 'generated', 'src');

fsExtra.copySync(exampleAppPath, destinationAppPath);
fsExtra.copySync(examplePath, destinationPath);

let packageJsonPath = path.resolve(destinationPath, 'package.json');
let originalJson = fsExtra.readJsonSync(packageJsonPath);

let libraryPackageJsonPath = path.resolve(process.cwd(), 'node_modules', 'angular2-config-generator', 'package.json');

originalJson.devDependencies['angular2-config-generator'] = '^' + fsExtra.readJsonSync(libraryPackageJsonPath).version;
fsExtra.outputJsonSync(packageJsonPath, originalJson);
