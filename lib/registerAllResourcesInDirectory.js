var fs = require('fs');
var processPotentialResourceFile = require('./register/processPotentialResourceFile');
var format = require('util').format;
var winston = require('winston');
var async = require('async');

var registerAllResourcesInDirectory = function(directoryPath, express, done) {    
    var processContents = createDirectoryContentsProcessor(directoryPath, express, done);
    
    fs.readdir(directoryPath, processContents);
};

var createDirectoryContentsProcessor = function(directoryPath, express, directoryDone) {
    return function(err, contents) {
        if (err) 
        {
            return directoryDone(err);
        }

        if (!contents)
        {
            return;
        }

        winston.info("Found " + contents.length + " to process in '" + directoryPath + "'");

        var addResourcesFromDirectory = function(fileOrDirectory, callback) {
            processFileOrDirectory(fileOrDirectory, directoryPath, express, callback);
        };

        async.forEach(contents, addResourcesFromDirectory, directoryDone);
    }
};

var processFileOrDirectory = function(fileOrDirectory, parentDirectory, express, fileOrDirectoryDone) {
    var fullPathToFile = parentDirectory + "/" + fileOrDirectory;

    fs.stat(fullPathToFile, function(err, fileStats) {
        // TODO - Use domains for this.
        try {
            if (err != null) {
                fileOrDirectoryDone(err);
            }

            if (fileStats.isDirectory())
            {
                winston.info("About to process directory " + fileOrDirectory);
                registerAllResourcesInDirectory(fullPathToFile + "/", express)
            }
            else
            {
                processPotentialResourceFile(fileOrDirectory, fullPathToFile, express);
            }

            fileOrDirectoryDone();
        } catch(err) {
            var message = format("Configure express for '%s' in '%s'. Exception: '%s'.", fileOrDirectory, parentDirectory, err)
            winston.error(message);
            fileOrDirectoryDone(err);
        }
    });
};

module.exports = registerAllResourcesInDirectory;