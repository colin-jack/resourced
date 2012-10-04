// TODO: Logging wrapper
var winston = require('winston');
var registerAllResourcesInDirectory = require('./lib/registerAllResourcesInDirectory');

var configureResourcesInDirectory = function(directoryPath, done) {
    try {
        registerAllResourcesInDirectory(directoryPath, app, done);
    } catch (ex) {
        winston.error("Failed to configure resources due to error: " + ex);
        done(ex);
    }
};

module.exports = { 
    configureResourcesInDirectory : configureResourcesInDirectory
}