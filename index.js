var resourced = require('require-namespace').createSync(__dirname + '/lib', 'resourced');
var winston = require('winston');
var Resource = resourced.Resource;
var cache = resourced.cache;
var http = resourced.http;

module.exports = { 
    configureResourcesInDirectory : resourced.RegistersResources.registerAllInDirectory,
    Resource: Resource,
    cache: cache,
    http: http
}