var winston = require('winston');

// global within the module
resourcedLib = require('./lib/namespace');

var Resource = require('./lib/resource/Resource');
var cache = require('./lib/caching/cache');
var http = require('./lib/resource/http');

var configureResourcesInDirectory = function(directoryPath, done) {
    try {
        var wrappingDone = function() {
            if (done) {
                winston.info("Completed resources registration.");
                done();
            }
        }

        var registerAllResourcesInDirectory = resourcedLib.require('registerAllResourcesInDirectory');
        registerAllResourcesInDirectory(directoryPath, app, wrappingDone);
    } catch (ex) {
        winston.error("Failed to configure resources due to error: " + ex);
        done(ex);
    }
};

module.exports = { 
    configureResourcesInDirectory : configureResourcesInDirectory,
    Resource: Resource,
    cache: cache,
    http: http
}