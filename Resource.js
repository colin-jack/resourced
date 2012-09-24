var winston = require('winston');
var express = require('express');
var _u = require('underscore')
var httpToExpressMethodMapper = require('./httpToExpressMethodMapper');
var responseCachingHelper = require('./responseCachingHelper');

// TODO: Redesign this, use common JS and normal modules, get rid of the prototype stuff.

var Resource = function(resourceDefinition) {
    this.resourceDefinition = resourceDefinition;
    this.resourceUrl = this.resourceDefinition.url;
}

Resource.prototype.configureExpress = function(toConfigure) {   
    var that = this;
    
    _u.each(this.resourceDefinition.respondsTo, function(resourceHandlerMethodDefinition) {
        that._processRespondsToDefinition(resourceHandlerMethodDefinition, toConfigure);
    });
}

Resource.prototype._processRespondsToDefinition = function(resourceHandlerMethodDefinition, toConfigure) {    
    var expressMethodName = httpToExpressMethodMapper.getExpressMethodName(resourceHandlerMethodDefinition)

    var handlerMethodName = _u.functions(resourceHandlerMethodDefinition)[0];
    
    this._registerRouteWithExpress(expressMethodName, handlerMethodName, resourceHandlerMethodDefinition)
}

var createBoundRequestHandler = function(handlerMethod) {
    return function(request, response, next) {
        // We want this inside the handler method to be this object
        var requestContext = {
            request: request, 
            response: response
        };

        debugger;

        var boundHandlerMethod = _u.bind(handlerMethod, requestContext);
        boundHandlerMethod();
    };
};

Resource.prototype._registerRouteWithExpress = function(expressMethodName, handlerMethodName, resourceHandlerMethodDefinition) {    
    var handlerMethod = resourceHandlerMethodDefinition[handlerMethodName];
    
    // TODO: If URL specified in responds to its appended

    winston.info("\tMethod '" + handlerMethodName + "' is associated with express method '" + expressMethodName + "' and URI " + this.resourceUrl);
    
    var responseCachingRouteMiddleware = responseCachingHelper.getResponseCachingRouteMiddleware(this.resourceDefinition.cache);

    var boundRequestHandler = createBoundRequestHandler(handlerMethod);
    
    responseCachingRouteMiddleware ? app[expressMethodName](this.resourceUrl, responseCachingRouteMiddleware, boundRequestHandler) : 
                                     app[expressMethodName](this.resourceUrl, boundRequestHandler);
};

module.exports = Resource;