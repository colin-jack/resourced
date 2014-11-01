var processPotentialResourceFile = require('./processPotentialResourceFile');
var winston = require('winston');

module.exports = function * (fileInfo, express) {
    if (fileInfo.stats.isDirectory())
    {
        winston.info("About to recurse into directory " + fileInfo.name);
        var registersResources = require('../RegistersResources')
        yield * registersResources.registerAllInDirectory(fileInfo.fullPath + "/", express)
    }
    else
    {
        processPotentialResourceFile(fileInfo.name, fileInfo.fullPath, express);
    }
};