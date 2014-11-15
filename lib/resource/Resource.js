var winston = require('winston');

var resourced = require('require-namespace').resourced;
var registerResourceMethodWithExpress = resourced.KoaUpdater.registerResourceMethod;
var getHttpMethodToUseForHandler = resourced.getHttpMethodToUseForHandler;
var getHandlerMethod = resourced.getHandlerMethod;

var Resource = function(resourceDefinition) {
    validateResourceDefinition(resourceDefinition);

    this.resourceDefinition = resourceDefinition;
}

Resource.prototype.configureExpress = function(express, dependencyResolver) {   
    var that = this;
    var methodsRespondedTo = this.resourceDefinition.respondsTo;

    methodsRespondedTo.forEach(function(handlerMethod) {
        registerResourceMethodWithExpress(handlerMethod, that.resourceDefinition, express, dependencyResolver);
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