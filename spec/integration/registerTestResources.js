var express = require('express');
var resourced = require('../../index');
var winston = require('winston');
var bodyParser = require('body-parser');
var Q = require('Q');

var registersResources = function* () {
    // NOTE - Creating global app here just to make testing simpler
    global.app = express();
    app.use(bodyParser());
    
    var resourcesDir = __dirname + '/resources';
    
    winston.log("info", "About to load resources from: " + resourcesDir);
    
    yield * resourced.configureResourcesInDirectory(resourcesDir, app);
    
    winston.log("info", "Loaded resources from: " + resourcesDir);
}

module.exports = function (done) {
    Q.spawn(function *() {
        try {
            yield * registersResources();
            
            done(null, null);
        } catch (err) {
            done(err, null);
        }
    });
};