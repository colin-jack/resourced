var express = require('express');
var resourced = require('../../index');
var winston = require('winston');
var bodyParser = require('body-parser')

var app = express();
app.use(bodyParser());

var resourcesDir = __dirname + '/resources';
winston.info("About to load resources from: " + resourcesDir);

module.exports = function() {
    resourced.configureResourcesInDirectory(resourcesDir, app);
};