var winston = require('winston');
global.lib = require('./lib/namespace');

var Resource = require('./lib/resource/Resource');
var cache = require('./lib/caching/cache');
var http = require('./lib/resource/http');

var configureResourcesInDirectory = function(directoryPath, done) {
    try {
        var wrappingDone = function() {
            winston.info("******************* DONE ********************************");
            done();
        }

        var registerAllResourcesInDirectory = lib.require('registerAllResourcesInDirectory');
        registerAllResourcesInDirectory(directoryPath, app, wrappingDone);
        winston.info("******************* OUT ********************************");
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