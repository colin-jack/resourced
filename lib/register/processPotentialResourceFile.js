var tryToRequire = require('./tryToRequire');
var winston = require('winston');
var shouldSkipFile = require('./shouldSkipFile');
var format = require('util').format;

module.exports = function(fileName, fullPathToFile, express) {
    if (shouldSkipFile(fileName)) {
        winston.info(format("Skipping %s - Not javascript", fileName));
        return;
    }

    var resource = tryToRequire(fullPathToFile);
   
    if (!resource.configureExpress) {
        winston.info(format("Skipping %s - Not a resource.", fileName));
        return;
    }

    winston.info(format("Processing resource in file '%s'.", fileName));

    resource.configureExpress(express);
}