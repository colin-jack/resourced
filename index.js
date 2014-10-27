var winston = require('winston');
var lib = require('./lib/namespace');
var Resource = require('./lib/resource/Resource');
var cache = require('./lib/caching/cache');
var http = require('./lib/resource/http');

module.exports = { 
    configureResourcesInDirectory : lib.RegistersResources.registerAllInDirectory,
    Resource: Resource,
    cache: cache,
    http: http
}