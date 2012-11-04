var _u = require('underscore'),
    populateArgumentsFromRequest = lib.require('populateArgumentsFromRequest'),
    httpMethodSpecificBehavior = lib.require('httpMethodSpecificBehavior'),
    validateParams = lib.require('validateParams'),
    validateBody = lib.require('validateBody');

// We want the context ('this') inside the handler method to be the returned object
var createContextForHandlerMethod = function(request, response) {
    return {
        request: createRequestWrapper(request), 
        response: createResponseWrapper(response)
    };
};

// We want to control the interface, providing just a subset of the request methods and using
// a resource oriented style.
var createRequestWrapper = function(request) {
    return {
        body: request.body
    };
};

var createResponseWrapper = function(response) {
    return {};
};

var getHandlerMethodArguments = function(request, handlerMethod, httpMethod) {
    var handlerMethodArguments = populateArgumentsFromRequest(request, handlerMethod);

    var httpMethodBehavior = httpMethodSpecificBehavior.forHttpMethod(httpMethod);
    httpMethodBehavior.augmentHandlerArguments(handlerMethodArguments, request);

    return handlerMethodArguments;
}

var isRequestValid = function (request, response, handlerMethodDefinition) {
    if (validateParams(request, response, handlerMethodDefinition) === false) {
        return false;
    }

    if (validateBody(request, response, handlerMethodDefinition) === false) {
        return false;
    }

    return true;
}

// handlerMethod is the function that will be registered to handle a specific type of HTTP request,
// here we wrap it with our own custom proxy function which is returned.
var createRequestHandler = function(httpMethod, handlerMethodDefinition, handlerMethodName, resourceDefinition) {
    return function(request, response, next) {
        if (!isRequestValid(request, response, handlerMethodDefinition)) {
            return;
        }

        var handlerMethod = handlerMethodDefinition[handlerMethodName];
        
        var requestContext = createContextForHandlerMethod(request, response);

        var handlerMethodArguments = getHandlerMethodArguments(request, handlerMethod, httpMethod);
        
        var returned = handlerMethod.apply(requestContext, handlerMethodArguments);

        setReturnedAsResponseBodyIfAppropriate(returned, response);
    };
};

var setReturnedAsResponseBodyIfAppropriate = function(returned, response) {
    response.send(returned);
}

module.exports = createRequestHandler;