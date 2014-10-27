var fs = require('fs');
var processFileStats = require('./register/processFileStats');
var format = require('util').format;
var winston = require('winston');
var Q = require('Q');
var readdir = Q.denodeify(fs.readdir);
var getFileStats = Q.denodeify(fs.stat);

var registerAllResourcesInDirectory = function (directoryPath, express) {
    // TODO: Throw if either null
    // TODO: Throw if directoryPath is invalid

    Q.spawn(function *() {
        try {
            var directoryContents = yield readdir(directoryPath);
            
            winston.log("info", "Found %s to process in '%s'.", directoryContents.length, directoryPath);
            
            var informationAboutFiles = yield Q.all(directoryContents.map(function (fileOrDirectory) {
                                                                    return getFileStatsPromise(fileOrDirectory, directoryPath)
                                                                })
                                        );
            
            informationAboutFiles.forEach(function(fileInformation) {
                processFileStats(fileInformation, express);
            });
        } catch (err) {
            logAndRethrowConfigError(err);
        }
    });
};

var logAndRethrowConfigError = function (err) {
    var message = format("Configure express for '%s' in '%s'. Exception: '%s'.", fileOrDirectory, parentDirectory, err)
    winston.error(message);
    throw err;
}

var getFileStatsPromise = function (fileOrDirectory, directoryPath) {
    var fullPath = directoryPath + "/" + fileOrDirectory;
    
    return getFileStats(fullPath)
                .then(function (fileStats) {
                    return {
                        stats: fileStats,
                        name: fileOrDirectory,
                        fullPath: fullPath
                    };
    });
}

module.exports = {
    registerAllInDirectory: registerAllResourcesInDirectory
}