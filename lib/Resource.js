var winston = require('winston'), 
    uriCreator = require('./uriCreator'),
    registerResourceMethodWithExpress = require('./registerResourceMethodWithExpress');

// TODO: Redesign this, use common JS and normal modules, get rid of the prototype stuff.

var Resource = function(resourceDefinition) {
    // TODO: Evaluate flatiron / revalidator
    if (!resourceDefinition.url) {
        throw new Error("Please provide a URL as part of your resource definition.");
    }

    this.resourceDefinition = resourceDefinition;
}

Resource.prototype.getUri = function(params) {
    return uriCreator.createUri(this.resourceDefinition, params);
}

Resource.prototype.configureExpress = function(express) {   
    var that = this;
    var methodsRespondedTo = this.resourceDefinition.respondsTo;

    methodsRespondedTo.every(function(handlerMethod) {
        registerResourceMethodWithExpress(handlerMethod, that.resourceDefinition, express);
    });
}

module.exports = Resource;