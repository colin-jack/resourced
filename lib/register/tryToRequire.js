var format = require('util').format;
var winston = require('winston');

module.exports = function(fullPathToFile) {
    try {
        return require(fullPathToFile);
    } catch (err) {
        winston.error(format("Failed requiring '%s' with error '%s'. %s", fullPathToFile, err, err.stack));        
        throw err;
    }
}