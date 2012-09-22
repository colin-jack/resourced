var fs = require('fs');
// TODO: Logging wrapper
var winston = require('winston');
var async = require('async');

var ResourceLayerConfigurer = function(toConfigure, done) {
    this.toConfigure = toConfigure;
    this.done = done;
}

// This is the entry point
ResourceLayerConfigurer.prototype.configureFromFilesIn = function(directoryPath) {
    var that = this;

    this.recursivelyProcessContentsOfDirectory(directoryPath);
}

ResourceLayerConfigurer.prototype.recursivelyProcessContentsOfDirectory = function(directoryPath) {
    var that = this;
    
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

        //winston.info("Found " + contents.length + " to process in '" + directoryPath = "'");

        async.forEach(contents, function(fileOrDirectory) {
            that.processFileOrDirectory(fileOrDirectory, directoryPath)
        });
    };
        
    fs.readdir(directoryPath, processContentsOfDirectory);
}

ResourceLayerConfigurer.prototype.processFileOrDirectory = function(fileOrDirectory, parentDirectory) {
    var that = this;
    var fullPathToFile = parentDirectory + "/" + fileOrDirectory;
    
    fs.stat(fullPathToFile, function(err, fileStats) {
        if (err != null) {
            return that.done(err);
        }

        if (fileStats.isDirectory())
        {
            winston.info("About to process directory " + fileOrDirectory);
            that.recursivelyProcessContentsOfDirectory(fullPathToFile + "/")
        }
        else
        {
            winston.info("About to process file " + fileOrDirectory);

            var resource = require(fullPathToFile);
            resource.configureExpress(this.toConfigure);
        }
    });
};

var configureResourcesInDirectory = function(directoryPath, done) {
    new ResourceLayerConfigurer(this, done).configureFromFilesIn(directoryPath);
}

module.exports = { 
    configureResourcesInDirectory : configureResourcesInDirectory
}