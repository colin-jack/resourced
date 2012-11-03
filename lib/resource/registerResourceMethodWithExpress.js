var HttpMethod = require('./HttpMethod'),
    _u = require('underscore'),
    winston = require('winston'),
    createRequestHandler = lib.require('createRequestHandler'),
    getResponseCachingMiddleware = lib.require('getResponseCachingMiddleware'), 
    getHttpMethodToUseForHandler = lib.require('getHttpMethodToUseForHandler'),
    getHandlerMethod = lib.require('getHandlerMethod');

var configureExpressForMethod = function(express, expressMethodName, middleWare, wrappedHandlerMethod, resourceUrl) {
    try
    {
        if (middleWare) {
            express[expressMethodName](resourceUrl, middleWare, wrappedHandlerMethod);
        } else {
            express[expressMethodName](resourceUrl, wrappedHandlerMethod);
        }
    } catch (e) {
        var message = require('util').format("Configuring '%s' for url '%s'. Exception: '%s'.", expressMethodName, resourceUrl, e);
        winston.error(message);
    }
};

var registerHandlerMethodWithExpress = function(handlerMethodDefinition, resourceDefinition, express) {
    var handlerMethodName = getHandlerMethod(handlerMethodDefinition);

    var httpMethod = getHttpMethodToUseForHandler(handlerMethodDefinition, handlerMethodName);

    winston.info("\tMethod '" + handlerMethodName + "' at URI " + resourceDefinition.url);
    
    var responseCachingMiddleware = getResponseCachingMiddleware(resourceDefinition, httpMethod);

    // TODO: Work out HTTP verb, then pass it and resource definition in (no longer pass in in handlerMethod) so that
    // the wrapped handler method and use that info.
    var wrappedHandlerMethod = createRequestHandler(handlerMethodName, handlerMethodDefinition, handlerMethodName, resourceDefinition);

    configureExpressForMethod(express, httpMethod, responseCachingMiddleware, wrappedHandlerMethod, resourceDefinition.url);
};

module.exports = registerHandlerMethodWithExpress