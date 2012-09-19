var fs = require('fs');
// TODO: Logging wrapper
var winston = require('winston');
var async = require('async');

var ResourceLayerConfigurer = function(toConfigure) {
    this.toConfigure = toConfigure;
}

// This is the entry point
ResourceLayerConfigurer.prototype.configureFromFilesIn = function(directoryPath) {
    winston.info("About to load resources from: " + directoryPath);
    var that = this;

    this.recursivelyProcessContentsOfDirectory(directoryPath);
}

ResourceLayerConfigurer.prototype.recursivelyProcessContentsOfDirectory = function(directoryPath) {
    var that = this;
    
    var processContentsOfDirectory = function(err, contents ) {
        if (!contents)
        {
            winston.info("No files or directories in resources directory.")
            return;
        }

        winston.info("About to process " + contents.length + " resource files");

        `.forEach(contents, function(fileOrDirectory) {
            that.processFileOrDirectory(fileOrDirectory, directoryPath)
        });
    };
        
    fs.readdir(directoryPath, processContentsOfDirectory);
}

ResourceLayerConfigurer.prototype.processFileOrDirectory = function(fileOrDirectory, parentDirectory) {
    var that = this;
    var fullPathToFile = parentDirectory + fileOrDirectory;
    
    fs.stat(fullPathToFile, function(err, fileStats) {
        if (fileStats.isDirectory())
        {
            that.recursivelyProcessContentsOfDirectory(fullPathToFile + "/")
        }
        else
        {
            var resource = require(fullPathToFile);
            resource.configureExpress(this.toConfigure);
        }
    });
};

var configureResourcesInDirectory = function(directoryPath) {
    new ResourceLayerConfigurer(this).configureFromFilesIn(directoryPath);
}

module.exports = { 
    configureResourcesInDirectory : configureResourcesInDirectory
}