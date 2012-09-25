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

var getParameterNames = function(toGetFor) {
    var funStr = toGetFor.toString();
    return funStr.slice(funStr.indexOf('(')+1, funStr.indexOf(')')).match(/([^\s,]+)/g);
}

var createRequestHandler = function(handlerMethod) {
    var requestHandler = function(request, response, next) {
        // We want the context ('this') inside the handler method to be this object
        var requestContext = {
            request: request, 
            response: response
        };

        debugger;

        var handlerMethodArguments = getHandlerMethodArguments(request, handlerMethod);

        handlerMethod.apply(requestContext, handlerMethodArguments);
    };

    return requestHandler;
};

// Express will normally pass in request/response but we instead look for parameters to the handler method that 
// have a name that matches an HTTP request parameter name and pass them. Thus if you have an "id" request parameter with
// value of 5 and a parameter named "id" then the 5 is passed in for that parameter.
var getHandlerMethodArguments = function(request, handlerMethod) {
    var handlerMethodArguments = [];

    if (handlerMethod.length === 0) {
        return handlerMethodArguments;
    }
            
    var handlerParameterNames = getParameterNames(handlerMethod);

    _u.each(handlerParameterNames, function(parameterName) {
        if (parameterName in request.params) {
            handlerMethodArguments.push(request.params[parameterName]);
        }
    });

    return handlerMethodArguments;
}

Resource.prototype._registerRouteWithExpress = function(expressMethodName, handlerMethodName, resourceHandlerMethodDefinition) {    
    var handlerMethod = resourceHandlerMethodDefinition[handlerMethodName];
    
    // TODO: If URL specified in responds to its appended

    winston.info("\tMethod '" + handlerMethodName + "' is associated with express method '" + expressMethodName + "' and URI " + this.resourceUrl);
    
    var responseCachingRouteMiddleware = responseCachingHelper.getResponseCachingRouteMiddleware(this.resourceDefinition.cache);

    var boundRequestHandler = createRequestHandler(handlerMethod);
    
    responseCachingRouteMiddleware ? app[expressMethodName](this.resourceUrl, responseCachingRouteMiddleware, boundRequestHandler) : 
                                     app[expressMethodName](this.resourceUrl, boundRequestHandler);
};

module.exports = Resource;