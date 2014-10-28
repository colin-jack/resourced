var winston = require('winston');
var Resource = require('./lib/resource/Resource');
var cache = require('./lib/caching/cache');
var http = require('./lib/resource/http');

module.exports = { 
    configureResourcesInDirectory : resourced.RegistersResources.registerAllInDirectory,
    Resource: Resource,
    cache: cache,
    http: http
}