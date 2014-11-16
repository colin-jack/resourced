var winston = require('winston');
var validUrl = require('valid-url');

var resourced = require('require-namespace').resourced;
var registerResourceMethodWithExpress = resourced.KoaUpdater.registerResourceMethod;
var getHttpMethodToUseForHandler = resourced.getHttpMethodToUseForHandler;
var getHandlerMethod = resourced.getHandlerMethod;

/**
 * Represents an HTTP accessible resource.
 * @constructor
 * @param {object} resourceDefinition - This is an object that specifies everything needed to host the resource. Values that can be specified include url, cache, urlSchema, respondsTo (array).
 */
var Resource = function(resourceDefinition) {
    validateResourceDefinition(resourceDefinition);

    this.resourceDefinition = resourceDefinition;
}

Resource.prototype.configure = function(express, dependencyResolver) {   
    var that = this;
    var methodsRespondedTo = this.resourceDefinition.respondsTo;

    methodsRespondedTo.forEach(function(handlerMethod) {
        registerResourceMethodWithExpress(handlerMethod, that.resourceDefinition, express, dependencyResolver);
    });
}

var validateResourceDefinition = function validateResourceDefinition(resourceDefinition) {
    var url = resourceDefinition.url;
    
    if (!url || typeof url !== 'string') {
        throw new Error("Please provide a URL as part of your resource definition.");
    }
    
    if (resourceDefinition.respondsTo == null || Array.isArray(resourceDefinition.respondsTo) === false || resourceDefinition.respondsTo.length == 0) {
        throw new Error("The responds to collection must be a non-empty array.");
    }

    resourceDefinition.respondsTo.forEach(function(respondsTo) {
        getHttpMethodToUseForHandler(respondsTo, getHandlerMethod(respondsTo));
    });
};

module.exports = Resource;