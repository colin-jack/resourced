var winston = require('winston');

var tryToRequire = require('./tryToRequire');
var shouldSkipFile = require('./shouldSkipFile');
var format = require('util').format;

// If its a file and contains a resource register it, if its a directory recurse, if its neither dump it
module.exports = function (fileName, fullPathToFile, express) {
    if (shouldSkipFile(fileName)) {
        winston.info(format("Skipping %s - Not javascript", fileName));
        return;
    }

    var resource = tryToRequire(fullPathToFile);
   
    // TODO: Same if its not a function
    if (!resource.configureExpress) {
        winston.info(format("Skipping %s - Not a resource.", fileName));
        return;
    }

    winston.info(format("Processing resource in file '%s'.", fileName));

    resource.configureExpress(express, dependencyResolver);
}