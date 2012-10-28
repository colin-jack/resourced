var processPotentialResourceFile = require('./processPotentialResourceFile');
var winston = require('winston');

module.exports = function(fileStats, fullPathToFile, fileOrDirectory, express, fileOrDirectoryDone) {
    if (fileStats.isDirectory())
    {
        winston.info("About to recurse into directory " + fileOrDirectory);

        var registerAll = require('../registerAllResourcesInDirectory');
        registerAll(fullPathToFile + "/", express, fileOrDirectoryDone)
    }
    else
    {
        processPotentialResourceFile(fileOrDirectory, fullPathToFile, express, fileOrDirectoryDone);
        fileOrDirectoryDone();
    }
};