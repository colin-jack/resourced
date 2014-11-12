var winston = require('winston');
var resourced = require('require-namespace').resourced;

var HttpMethod = resourced.HttpMethod;
var RequestHandlerCreator = resourced.RequestHandlerCreator;
var getResponseCachingMiddleware = resourced.getResponseCachingMiddleware;
var getHttpMethodToUseForHandler = resourced.getHttpMethodToUseForHandler;
var getHandlerMethod = resourced.getHandlerMethod;

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

var registerResourceMethod = function(handlerMethodDefinition, resourceDefinition, express, dependencyResolver) {
    var handlerMethodName = getHandlerMethod(handlerMethodDefinition);

    var httpMethod = getHttpMethodToUseForHandler(handlerMethodDefinition, handlerMethodName);

    winston.info("\tMethod '" + handlerMethodName + "' at URI " + resourceDefinition.url);
    
    var responseCachingMiddleware = getResponseCachingMiddleware(resourceDefinition, httpMethod);

    // TODO: Work out HTTP verb, then pass it and resource definition in (no longer pass in in handlerMethod) so that
    // the handling request and use that info.
    var wrappedHandlerMethod = RequestHandlerCreator.create(handlerMethodName, handlerMethodDefinition, handlerMethodName, resourceDefinition, dependencyResolver);

    configureExpressForMethod(express, httpMethod, responseCachingMiddleware, wrappedHandlerMethod, resourceDefinition.url);
};

module.exports = {
    registerResourceMethod: registerResourceMethod
}