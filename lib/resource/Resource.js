var winston = require('winston'), 
    registerResourceMethodWithExpress = resourcedLib.require('registerResourceMethodWithExpress'),
    getHttpMethodToUseForHandler = resourcedLib.require('getHttpMethodToUseForHandler'),
    getHandlerMethod = resourcedLib.require('getHandlerMethod'),
    _u = require('underscore');

var Resource = function(resourceDefinition) {
    validateResourceDefinition(resourceDefinition);

    this.resourceDefinition = resourceDefinition;
}

Resource.prototype.configureExpress = function(express) {   
    var that = this;
    var methodsRespondedTo = this.resourceDefinition.respondsTo;

    methodsRespondedTo.forEach(function(handlerMethod) {
        registerResourceMethodWithExpress(handlerMethod, that.resourceDefinition, express);
    });
}

var validateResourceDefinition = function validateResourceDefinition(resourceDefinition) {
    if (!resourceDefinition.url) {
        throw new Error("Please provide a URL as part of your resource definition.");
    }

    resourceDefinition.respondsTo.forEach(function(respondsTo) {
        getHttpMethodToUseForHandler(respondsTo, getHandlerMethod(respondsTo));

        throwIfMoreThanOneFunction(respondsTo);
    });
};

var throwIfMoreThanOneFunction = function throwIfMoreThanOneFunction(respondsTo) {
    var functions = _u.functions(respondsTo);

    if (functions.length !== 1) {
        throw new Error("Each object in the responds to must contain one function.")
    }
}

module.exports = Resource;