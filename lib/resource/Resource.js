var winston = require('winston'), 
    urlCreator = lib.require('urlCreator'),
    registerResourceMethodWithExpress = lib.require('registerResourceMethodWithExpress'),
    getHttpMethodToUseForHandler = lib.require('getHttpMethodToUseForHandler'),
    getHandlerMethod = lib.require('getHandlerMethod');

var Resource = function(resourceDefinition) {
    validateResourceDefinition(resourceDefinition);

    this.resourceDefinition = resourceDefinition;
}

Resource.prototype.getUrl = function(uriParams, request) {
    return urlCreator.createUrl(this.resourceDefinition, uriParams, request);
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
    });
};

module.exports = Resource;