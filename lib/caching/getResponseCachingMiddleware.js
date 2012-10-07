var NoCachingDefinition = require('./NoCachingDefinition');

var getResponseCachingMiddleware = function(cachingDefinition) {
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