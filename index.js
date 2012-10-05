// TODO: Logging wrapper
var winston = require('winston');
var libNamespace = require('./lib/namespace');

var configureResourcesInDirectory = function(directoryPath, done) {
    try {
        // make the namespace for the lib directory global for easier access
        global.lib = libNamespace;
        var registerAllResourcesInDirectory = libNamespace.require('registerAllResourcesInDirectory');

        registerAllResourcesInDirectory(directoryPath, app, done);
    } catch (ex) {
        winston.error("Failed to configure resources due to error: " + ex);
        done(ex);
    }
};

module.exports = { 
    configureResourcesInDirectory : configureResourcesInDirectory
}