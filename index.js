// TODO: Logging wrapper
var winston = require('winston');
var resourcesRegistrar = require('./lib/resourcesRegistrar');

var configureResourcesInDirectory = function(directoryPath, done) {
    try {
        resourcesRegistrar.registerAllResourcesInDirectory(directoryPath, app, done);
    } catch (ex) {
        winston.error("Failed to configure resources due to error: " + ex);
        done(ex);
    }
};

module.exports = { 
    configureResourcesInDirectory : configureResourcesInDirectory
}