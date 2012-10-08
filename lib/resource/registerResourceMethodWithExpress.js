var HttpMethod = require('./HttpMethod'),
    _u = require('underscore'),
    winston = require('winston'),
    createWrappedHandlerMethod = lib.require('createWrappedHandlerMethod'),
    httpToExpressMethodMapper = lib.require('httpToExpressMethodMapper'),
    getResponseCachingMiddleware = lib.require('getResponseCachingMiddleware'), 
    getHttpMethodToUseForHandler = lib.require('getHttpMethodToUseForHandler'),
    getHandlerMethod = lib.require('getHandlerMethod');

var configureExpressForMethod = function(express, expressMethodName, middleWare, wrappedHandlerMethod, resourceUrl) {
    // NOTE - expressMethodName is the HTTP verb.
    if (middleWare) {
        express[expressMethodName](resourceUrl, middleWare, wrappedHandlerMethod);
    } else {
        express[expressMethodName](resourceUrl, wrappedHandlerMethod);
    }
};

var registerHandlerMethodWithExpress = function(handlerMethodDefinition, resourceDefinition, express) {
    var expressMethodName = httpToExpressMethodMapper.getExpressMethodName(handlerMethodDefinition)
    var handlerMethodName = getHandlerMethod(handlerMethodDefinition);
    var handlerMethod = handlerMethodDefinition[handlerMethodName];
    
    winston.info("\tMethod '" + handlerMethodName + "' is associated with express method '" + expressMethodName + "' and URI " + resourceDefinition.url);

    var httpMethod = getHttpMethodToUseForHandler(handlerMethodDefinition, handlerMethodName);
    
    var responseCachingMiddleware = getResponseCachingMiddleware(resourceDefinition, httpMethod);

    // TODO: Work out HTTP verb, then pass it and resource definition in (no longer pass in in handlerMethod) so that
    // the wrapped handler method and use that info.
    var wrappedHandlerMethod = createWrappedHandlerMethod(handlerMethodName, handlerMethod);

    configureExpressForMethod(express, expressMethodName, responseCachingMiddleware, wrappedHandlerMethod, resourceDefinition.url);
};

module.exports = registerHandlerMethodWithExpress