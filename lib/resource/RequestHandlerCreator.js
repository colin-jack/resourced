var resourced = require('require-namespace').resourced;
var HttpMethod = resourced.HttpMethod;
var populateArgumentsFromRequest = resourced.populateArgumentsFromRequest;
var httpMethodSpecificBehavior = resourced.httpMethodSpecificBehavior;
var getHttpMethodToUseForHandler = resourced.getHttpMethodToUseForHandler;
var validateUrl = resourced.validateUrl;
var validateBody = resourced.validateBody;
var createUrl = resourced.createUrl;
var RulesError = require('rules').RulesError;

// We want the context ('this') inside the handler method to be the returned object
var createContextForHandlerMethod = function createContextForHandlerMethod(request, response, httpMethod) {
    return {
        request: createRequestWrapper(request), 
        response: createResponseWrapper(response, httpMethod),
        urlFor: createUrlForWrapper(request)
    };
};

var createUrlForWrapper = function createUrlForWrapper(request) {
    return function (resource, options) {
        //debugger;
        return createUrl(resource.resourceDefinition, options, request);
    }
};

// We want to control the interface, providing just a subset of the request methods and using
// a resource oriented style.
var createRequestWrapper = function createRequestWrapper(request) {
    return request;
};

var createResponseWrapper = function createResponseWrapper(response, httpMethod) {
    return response;
};

var getHandlerMethodArguments = function getHandlerMethodArguments(context, request, handlerMethod, httpMethod, dependencyResolver) {
    var handlerMethodArguments = populateArgumentsFromRequest(context, dependencyResolver, handlerMethod);

    var httpMethodBehavior = httpMethodSpecificBehavior.forHttpMethod(httpMethod);
    httpMethodBehavior.augmentHandlerArguments(handlerMethodArguments, request);

    return handlerMethodArguments;
}

var isRequestValid = function isRequestValid(context, handlerMethodDefinition, resourceDefinition) {
    //debugger;
    if (validateUrl(context, handlerMethodDefinition, resourceDefinition) === false) {
        return false;
    }

    if (validateBody(context, handlerMethodDefinition) === false) {
        return false;
    }

    return true;
}

var setReturnedAsResponseBodyIfAppropriate = function setReturnedAsResponseBodyIfAppropriate(returned, context) {
    if (!returned || (context.response.body !== undefined && context.response.body !== null)) return;
    
    context.response.body = returned;
}

var callWrappedHandlerMethod = function * (context, handlerMethod, handlerMethodArguments) {
    try {
        return yield * handlerMethod.apply(context, handlerMethodArguments);
    } catch (e) {
        //debugger;
        if (e instanceof RulesError) {
            delete e.errors;
            context.response.body = e;
            context.response.status = 400;
        } else {
            throw e;
        }
    }
}

// handlerMethod is the function that will be registered to handle a specific type of HTTP request,
// here we wrap it with our own custom proxy function which is returned.
var createRequestHandler = function createRequestHandler(httpMethod, handlerMethodDefinition, handlerMethodName, resourceDefinition, dependencyResolver) {
    return function * () {
        var request = this.request;
        var response = this.response;
        
        this.urlFor = createUrlForWrapper(request);

        if (!isRequestValid(this, handlerMethodDefinition, resourceDefinition)) {
            return;
        }

        var handlerMethod = handlerMethodDefinition[handlerMethodName];

        httpMethod = getHttpMethodToUseForHandler(handlerMethodDefinition, handlerMethodName);
        
        var handlerMethodArguments = getHandlerMethodArguments(this, request, handlerMethod, httpMethod, dependencyResolver);
        
        var returned = yield * callWrappedHandlerMethod(this, handlerMethod, handlerMethodArguments);
        
        setReturnedAsResponseBodyIfAppropriate(returned, this);
    };
};

module.exports = {
    create: createRequestHandler
};