var HttpMethod = require('./HttpMethod'),
    resourced = require('require-namespace').resourced,
    _u = require('underscore'),
    winston = require('winston'),
    RequestHandlerCreator = resourced.RequestHandlerCreator,
    getResponseCachingMiddleware = resourced.require('getResponseCachingMiddleware'), 
    getHttpMethodToUseForHandler = resourced.require('getHttpMethodToUseForHandler'),
    getHandlerMethod = resourced.require('getHandlerMethod');

var configureExpressForMethod = function(express, expressMethodName, middleWare, wrappedHandlerMethod, resourceUrl) {
    try {
        //debugger;
        
        if (expressMethodName == "put") {
            if (middleWare) {
                express.put(resourceUrl, middleWare, wrappedHandlerMethod);
            } else {
                express.put(resourceUrl, wrappedHandlerMethod);
            }
        } else {
            if (middleWare) {
                express.get(resourceUrl, middleWare, wrappedHandlerMethod);
            } else {
                express.get(resourceUrl, wrappedHandlerMethod);
            }
        }
        
        
    } catch (e) {
        var message = require('util').format("Failed configuring '%s' for url '%s'. Exception: '%s'.", expressMethodName, resourceUrl, e);
        winston.error(message);
    }
};

var registerHandlerMethodWithExpress = function(handlerMethodDefinition, resourceDefinition, express) {
    var handlerMethodName = getHandlerMethod(handlerMethodDefinition);

    var httpMethod = getHttpMethodToUseForHandler(handlerMethodDefinition, handlerMethodName);

    winston.info("\tMethod '" + handlerMethodName + "' at URI " + resourceDefinition.url);
    
    var responseCachingMiddleware = getResponseCachingMiddleware(resourceDefinition, httpMethod);

    // TODO: Work out HTTP verb, then pass it and resource definition in (no longer pass in in handlerMethod) so that
    // the handling request and use that info.
    var wrappedHandlerMethod = RequestHandlerCreator.create(handlerMethodName, handlerMethodDefinition, handlerMethodName, resourceDefinition);

    configureExpressForMethod(express, httpMethod, responseCachingMiddleware, wrappedHandlerMethod, resourceDefinition.url);
};

module.exports = {
    registerResourceMethod: registerHandlerMethodWithExpress
}