var winston = require('winston');

var resourced = require('require-namespace').resourced;

var HttpMethod = resourced.HttpMethod;
var RequestHandlerCreator = resourced.RequestHandlerCreator;
var getResponseCachingMiddleware = resourced.getResponseCachingMiddleware;
var getHttpMethodToUseForHandler = resourced.getHttpMethodToUseForHandler;
var getHandlerMethod = resourced.getHandlerMethod;

var configureappForMethod = function(app, httpMethod, middleware, wrappedHandlerMethod, resourceUrl) {
    try {        
        if (middleware) {
            app[httpMethod](resourceUrl, middleware, wrappedHandlerMethod);
        } else {
            app[httpMethod](resourceUrl, wrappedHandlerMethod);
        }

    } catch (e) {
        var message = require('util').format("Failed configuring '%s' for url '%s'. Exception: '%s'.", httpMethod, resourceUrl, e);
        winston.error(message);
    }
};

var registerResourceMethod = function(handlerMethodDefinition, resourceDefinition, app, dependencyResolver) {
    var handlerMethodName = getHandlerMethod(handlerMethodDefinition);

    var httpMethod = getHttpMethodToUseForHandler(handlerMethodDefinition, handlerMethodName);

    winston.info("\tMethod '" + handlerMethodName + "' at URI " + resourceDefinition.url);
    
    //debugger;
    
    var responseCachingmiddleware = getResponseCachingMiddleware(resourceDefinition, httpMethod);

    // TODO: Work out HTTP verb, then pass it and resource definition in (no longer pass in in handlerMethod) so that
    // the handling request and use that info.
    var wrappedHandlerMethod = RequestHandlerCreator.create(handlerMethodName, handlerMethodDefinition, handlerMethodName, resourceDefinition, dependencyResolver);

    configureappForMethod(app, httpMethod, responseCachingmiddleware, wrappedHandlerMethod, resourceDefinition.url);
};

module.exports = {
    registerResourceMethod: registerResourceMethod
}