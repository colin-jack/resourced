var fs = require('fs');
var winston = require('winston');
var Q = require('q');

var format = require('util').format;
var readdir = Q.denodeify(fs.readdir);
var getFileStats = Q.denodeify(fs.stat);

var resourced = require('./namespace');
var processPotentialResourceFiles = resourced.processPotentialResourceFiles;

var registerAllResourcesInDirectory = function * (directoryPath, express, dependencyResolver) {
    validateArguments(directoryPath, express, dependencyResolver);

    try {
        var directoryContents = yield readdir(directoryPath);
                    
        winston.log("info", "Found %s to process in '%s'.", directoryContents.length, directoryPath);
            
        var informationAboutFiles = yield Q.all(directoryContents.map(function (fileOrDirectory) {
            return getFileInformation(fileOrDirectory, directoryPath);
        }));

        for (var i = 0; i < informationAboutFiles.length; i++) {
            yield * processPotentialResourceFiles(informationAboutFiles[i], express, dependencyResolver);
        }

    } catch (err) {
        logErrorAndRethrow(err);
    }
};

var getFileInformation = function (fileOrDirectory, directoryPath) {
    var fullPath = directoryPath + "/" + fileOrDirectory;
    
    return getFileStats(fullPath)
            .then(function (fileStats) {
                    return {
                        stats: fileStats,
                        name: fileOrDirectory,
                        fullPath: fullPath
                    }
    });
}

var validateArguments = function (directoryPath, express, dependencyResolver) {
    if (express == null || express == undefined || !express.use) throw new ReferenceError("You must provide the express instance to configure.");
    
    var directoryPathIsNotString = typeof directoryPath != 'string' && !(directoryPath instanceof String)
    if (directoryPathIsNotString || directoryPath.length == 0) {
        throw new ReferenceError("You must provide the directory path to scan.");
    }
    
    if (!fs.existsSync(directoryPath)) {
        var message = "The specified directory does not exist " + directoryPath + ".";
        throw new ReferenceError(message);
    }

    if (dependencyResolver) {
        if (!dependencyResolver.resolve || typeof dependencyResolver.resolve !== 'function') {
            throw new ReferenceError("If provided the dependencyResolver must have a resolve function.");
        }
    }
}

var logErrorAndRethrow = function (err) {
    var message = format("Configure express for '%s' in '%s'. Exception: '%s'.", fileOrDirectory, parentDirectory, err)
    winston.log("error", message);

    throw err;
}

module.exports = {
    // Generator method that will recursively register all resources in a specified directory
    // with express
    registerAllInDirectory: registerAllResourcesInDirectory
}