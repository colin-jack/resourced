var NoCachingDefinition = require('./NoCachingDefinition');

var getResponseCachingMiddleware = function(resourceDefinition, httpMethod) {
    if (httpMethod !== "get") {
        return null;
    }

    var cachingDefinition = resourceDefinition.cache;

    if (!cachingDefinition) {
        cachingDefinition = new NoCachingDefinition();
    }

    var cacheControlValue = cachingDefinition.getCacheControlValue();

    return function * cacheResponse(next) {
        this.response.set('Cache-Control', cacheControlValue);
        yield * next;
    }
};

module.exports = getResponseCachingMiddleware;