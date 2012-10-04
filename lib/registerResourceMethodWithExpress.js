var HttpMethod = require('./HttpMethod'),
    winston = require('winston'),
    createWrappedHandlerMethod = require('./createWrappedHandlerMethod'),
    httpToExpressMethodMapper = require('./httpToExpressMethodMapper'),
    responseCachingHelper = require('./responseCachingHelper');

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
    
    // TODO: If URL specified in responds to its appended to the resource's URL

    debugger;

    winston.info("\tMethod '" + handlerMethodName + "' is associated with express method '" + expressMethodName + "' and URI " + resourceDefinition.url);
    
    var responseCachingMiddleware = responseCachingHelper.getResponseCachingRouteMiddleware(resourceDefinition.cache);

    var httpMethod = HttpMethod.mapFrom(handlerMethodName);
    
    var wrappedHandlerMethod = createWrappedHandlerMethod(handlerMethodName, handlerMethod);

    configureExpressForMethod(express, expressMethodName, responseCachingMiddleware, wrappedHandlerMethod, resourceDefinition.url);
};

module.exports = registerHandlerMethodWithExpress