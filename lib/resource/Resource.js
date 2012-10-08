var winston = require('winston'), 
    uriCreator = require('./uriCreator'),
    Link = require('./Link')
    registerResourceMethodWithExpress = lib.require('registerResourceMethodWithExpress');

var Resource = function(resourceDefinition) {
    if (!resourceDefinition.url) {
        throw new Error("Please provide a URL as part of your resource definition.");
    }

    this.resourceDefinition = resourceDefinition;
}

Resource.prototype.getLink = function(rel, uriParams) {
    var uri = uriCreator.createUri(this.resourceDefinition, uriParams);
    return new Link(rel, uri);
}

Resource.prototype.configureExpress = function(express) {   
    var that = this;
    var methodsRespondedTo = this.resourceDefinition.respondsTo;

    methodsRespondedTo.forEach(function(handlerMethod) {
        registerResourceMethodWithExpress(handlerMethod, that.resourceDefinition, express);
    });
}

module.exports = Resource;