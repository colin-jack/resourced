var fs = require('fs');
var format = require('util').format;
// TODO: Logging wrapper
var winston = require('winston');
var async = require('async');

var registerAllResourcesInDirectory = function(directoryPath, express, done) {
    var processContentsOfDirectory = function(err, contents) {
        if (err) 
        {
            return done(err);
        }

        if (!contents)
        {
            winston.info("No files or directories in resources directory.")
            return;
        }

        winston.info("Found " + contents.length + " to process in '" + directoryPath + "'");

        var addResourcesFromDirectory = function(fileOrDirectory, callback) {
            processFileOrDirectory(fileOrDirectory, directoryPath, express, callback)
        };

        async.forEach(contents, addResourcesFromDirectory, done);
    };

    fs.readdir(directoryPath, processContentsOfDirectory);
};

var shouldSkipFile = function(fileName) {
    var split = fileName.split('.');
    var extension = split[split.length - 1];
    return extension !== "js";
}

var processPotentialResourceFile = function(fileName, fullPathToFile, express) {
    if (shouldSkipFile(fileName)) {
        winston.info("Skipping file: " + fileName);
        return;
    }

    var resource = require(fullPathToFile);

    if (!resource.configureExpress) {
        winston.info(format("The file '%s' does not seem to have a resource.", fileName));
        return;
    }

    winston.info(format("Processing resource in file '%s'.", fileName));

    resource.configureExpress(express);
}

var processFileOrDirectory = function(fileOrDirectory, parentDirectory, express, done) {
    var fullPathToFile = parentDirectory + "/" + fileOrDirectory;

    fs.stat(fullPathToFile, function(err, fileStats) {
        // TODO - Use domains for this.
        try {
            if (err != null) {
                done(err);
            }

            if (fileStats.isDirectory())
            {
                winston.info("About to process directory " + fileOrDirectory);
                registerAllResourcesInDirectory(fullPathToFile + "/")
            }
            else
            {
                processPotentialResourceFile(fileOrDirectory, fullPathToFile, express);
            }

            done();
        } catch(err) {
            winston.info("Failed with configuring express: " + err.toString());
            done(err);
        }
    });
};

module.exports = {
    registerAllResourcesInDirectory : registerAllResourcesInDirectory
}