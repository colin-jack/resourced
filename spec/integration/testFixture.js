// sets up the namespace used by the test code, the namespace keeps the coupling related to directory structures
// under control so  we don't end up with paths like ../../../../lib/Resource
var testFixture = require('./../unit/testFixture');

var express = require('express');
var resourced = require('../../index')

global.app = express();
app.use(express.bodyParser());

var resourcesDir = __dirname + '/resources';
console.log("About to load resources from: " + resourcesDir);

resourced.configureResourcesInDirectory(resourcesDir);