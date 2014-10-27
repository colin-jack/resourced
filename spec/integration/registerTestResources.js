var express = require('express');
var resourced = require('../../index');
var winston = require('winston');
var bodyParser = require('body-parser')

global.app = express();
app.use(bodyParser());

var resourcesDir = __dirname + '/resources';
winston.info("About to load resources from: " + resourcesDir);

var registered = false;

var callDone = function(done) {
    if (done)
        done();
}

module.exports = function(done) {
    if (registered) {
        callDone(done);
        return;
    }

    var onRegistered = function() {
        registered = true;
        callDone(done);
    }

    resourced.configureResourcesInDirectory(resourcesDir, onRegistered);
};