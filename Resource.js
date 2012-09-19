var winston = require('winston');
var express = require('express');
var _u = require('underscore')
var httpToExpressMethodMapper = require('./httpToExpressMethodMapper');
var responseCachingHelper = require('./responseCachingHelper');

var Resource = function(resourceDefinition) {
    this.resourceDefinition = resourceDefinition;
    this.resourceUrl = this.resourceDefinition.url;
}

Resource.prototype.configureExpress = function(toConfigure) {   
    var that = this;
    
    _u.each(this.resourceDefinition.respondsTo, function(resourceDefinition) {
        that._processRespondsToDefinition(resourceDefinition, toConfigure);
    });
}

Resource.prototype._processRespondsToDefinition = function(respondsToDefinition, toConfigure) {    
    var expressMethodName = httpToExpressMethodMapper.getExpressMethodName(respondsToDefinition)

    var handlerMethodName = _u.functions(respondsToDefinition)[0];
    
    this._registerRouteWithExpress(expressMethodName, handlerMethodName, respondsToDefinition)
}

Resource.prototype._registerRouteWithExpress = function(expressMethodName, handlerMethodName, respondsToDefinition) {    
    var handlerMethod = respondsToDefinition[handlerMethodName];
    
    // TODO: If URL specified in responds to its appended

    winston.info("Method " + handlerMethodName + " is associated with express method " + expressMethodName + " and URI " + this.resourceUrl);
    
    var handlesRequest = function(request, response, next) {
        var context = {request: request, response: response};
        _u.bind(handlerMethod, context)();
    };

    var responseCachingRouteMiddleware = responseCachingHelper.getResponseCachingRouteMiddleware(this.resourceDefinition.cache);
    
    responseCachingRouteMiddleware ? app[expressMethodName](this.resourceUrl, responseCachingRouteMiddleware, handlesRequest) : 
                                     app[expressMethodName](this.resourceUrl, handlesRequest);
};

module.exports = Resource;