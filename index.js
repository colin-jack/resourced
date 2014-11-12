var resourced = require('./lib/namespace');

var Resource = resourced.Resource;
var cache = resourced.cache;
var http = resourced.http;

module.exports = { 
    configureResourcesInDirectory : resourced.RegistersResources.registerAllInDirectory,
    Resource: Resource,
    cache: cache,
    http: http
}