var NoCachingDefinition = require('./NoCachingDefinition');

var getResponseCachingMiddleware = function(resourceDefinition) {
    var cachingDefinition = resourceDefinition.cache;

    if (!cachingDefinition) {
        cachingDefinition = new NoCachingDefinition();
    }

    var cacheControlValue = cachingDefinition.getCacheControlValue();

    return function(request, response, next) {
        response.header('Cache-Control', cacheControlValue)
        next();
    }
};

module.exports = getResponseCachingMiddleware;