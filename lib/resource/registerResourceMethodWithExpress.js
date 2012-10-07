var HttpMethod = require('./HttpMethod'),
    _u = require('underscore'),
    winston = require('winston'),
    createWrappedHandlerMethod = lib.require('createWrappedHandlerMethod'),
    httpToExpressMethodMapper = lib.require('httpToExpressMethodMapper'),
    getResponseCachingMiddleware = lib.require('getResponseCachingMiddleware');

var configureExpressForMethod = function(express, expressMethodName, middleWare, wrappedHandlerMethod, resourceUrl) {
    if (middleWare) {
        express[expressMethodName](resourceUrl, middleWare, wrappedHandlerMethod);
    } else {
        express[expressMethodName](resourceUrl, wrappedHandlerMethod);
    }
};

var registerHandlerMethodWithExpress = function(handlerMethodDefinition, resourceDefinition, express) {
    var expressMethodName = httpToExpressMethodMapper.getExpressMethodName(handlerMethodDefinition)
    var handlerMethodName = _u.functions(handlerMethodDefinition)[0];
    var handlerMethod = handlerMethodDefinition[handlerMethodName];
    
    winston.info("\tMethod '" + handlerMethodName + "' is associated with express method '" + expressMethodName + "' and URI " + resourceDefinition.url);
    
    var responseCachingMiddleware = getResponseCachingMiddleware(resourceDefinition.cache);
    
    var wrappedHandlerMethod = createWrappedHandlerMethod(handlerMethodName, handlerMethod);

    configureExpressForMethod(express, expressMethodName, responseCachingMiddleware, wrappedHandlerMethod, resourceDefinition.url);
};

module.exports = registerHandlerMethodWithExpress