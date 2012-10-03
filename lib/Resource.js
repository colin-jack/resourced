var winston = require('winston'), 
    express = require('express'),
    _u = require('underscore'),
    httpToExpressMethodMapper = require('./httpToExpressMethodMapper'),
    responseCachingHelper = require('./responseCachingHelper'),
    createWrappedHandlerMethod = require('./createWrappedHandlerMethod'),
    uriCreator = require('./uriCreator');

// TODO: Redesign this, use common JS and normal modules, get rid of the prototype stuff.

var Resource = function(resourceDefinition) {
    this.resourceDefinition = resourceDefinition;
    this.resourceUrl = this.resourceDefinition.url;
}

Resource.prototype.getUri = function(params) {
    return uriCreator.createUri(this, params);
}

Resource.prototype.configureExpress = function(express) {   
    this.express = express;
    
    var methodsRespondedTo = this.resourceDefinition.respondsTo;
    var boundProcess = this._processHandlerMethodDefinition.bind(this);
    
    methodsRespondedTo.every(boundProcess);
}

Resource.prototype._processHandlerMethodDefinition = function(resourceHandlerMethodDefinition) {    
    var expressMethodName = httpToExpressMethodMapper.getExpressMethodName(resourceHandlerMethodDefinition)

    var handlerMethodName = _u.functions(resourceHandlerMethodDefinition)[0];
    
    this._registerRouteWithExpress(expressMethodName, handlerMethodName, resourceHandlerMethodDefinition)
}

Resource.prototype._registerRouteWithExpress = function(expressMethodName, handlerMethodName, resourceHandlerMethodDefinition) {    
    var handlerMethod = resourceHandlerMethodDefinition[handlerMethodName];
    
    // TODO: If URL specified in responds to its appended to the resource's URL

    winston.info("\tMethod '" + handlerMethodName + "' is associated with express method '" + expressMethodName + "' and URI " + this.resourceUrl);
    
    var responseCachingMiddleware = responseCachingHelper.getResponseCachingRouteMiddleware(this.resourceDefinition.cache);
    
    var wrappedHandlerMethod = createWrappedHandlerMethod(handlerMethod);

    this._configureExpressForMethod(expressMethodName, responseCachingMiddleware, wrappedHandlerMethod);
};

Resource.prototype._configureExpressForMethod = function(expressMethodName, middleWare, wrappedHandlerMethod) {
    if (middleWare) {
        this.express[expressMethodName](this.resourceUrl, middleWare, wrappedHandlerMethod);
    } else {
        this.express[expressMethodName](this.resourceUrl, wrappedHandlerMethod);
    }
}

module.exports = Resource;