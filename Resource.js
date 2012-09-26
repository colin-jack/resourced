var winston = require('winston');
var express = require('express');
var _u = require('underscore');
var httpToExpressMethodMapper = require('./httpToExpressMethodMapper');
var responseCachingHelper = require('./responseCachingHelper');
var createResourceHandler = require('./createResourceHandler');

// TODO: Redesign this, use common JS and normal modules, get rid of the prototype stuff.

var Resource = function(resourceDefinition) {
    this.resourceDefinition = resourceDefinition;
    this.resourceUrl = this.resourceDefinition.url;
}

Resource.prototype.configureExpress = function(express) {   
    var that = this;
    
    _u.each(this.resourceDefinition.respondsTo, function(resourceHandlerMethodDefinition) {
        that._processRespondsToDefinition(resourceHandlerMethodDefinition, express);
    });
}

Resource.prototype._processRespondsToDefinition = function(resourceHandlerMethodDefinition, express) {    
    var expressMethodName = httpToExpressMethodMapper.getExpressMethodName(resourceHandlerMethodDefinition)

    var handlerMethodName = _u.functions(resourceHandlerMethodDefinition)[0];
    
    this._registerRouteWithExpress(express, expressMethodName, handlerMethodName, resourceHandlerMethodDefinition)
}

Resource.prototype._registerRouteWithExpress = function(express, expressMethodName, handlerMethodName, resourceHandlerMethodDefinition) {    
    var handlerMethod = resourceHandlerMethodDefinition[handlerMethodName];
    
    // TODO: If URL specified in responds to its appended to the resource's URL

    debugger;

    winston.info("\tMethod '" + handlerMethodName + "' is associated with express method '" + expressMethodName + "' and URI " + this.resourceUrl);
    
    var responseCachingMiddleware = responseCachingHelper.getResponseCachingRouteMiddleware(this.resourceDefinition.cache);

    var boundRequestHandler = createResourceHandler(handlerMethod);

    configureExpressForMethod(express, expressMethodName, responseCachingMiddleware, boundRequestHandler, this.resourceUrl);
};

var configureExpressForMethod = function(express, expressMethodName, middleWare, boundRequestHandler, resourceUrl) {
    if (middleWare) {
        express[expressMethodName](resourceUrl, middleWare, boundRequestHandler);
    } else {
        express[expressMethodName](resourceUrl, boundRequestHandler);
    }
}

module.exports = Resource;