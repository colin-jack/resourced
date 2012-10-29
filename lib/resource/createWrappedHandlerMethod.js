var _u = require('underscore'),
    populateArgumentsFromRequest = lib.require('populateArgumentsFromRequest'),
    httpMethodSpecificBehavior = lib.require('httpMethodSpecificBehavior');

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

// handlerMethod is the function that will be registered to handle a specific type of HTTP request,
// here we wrap it with our own custom proxy function which is returned.
var createWrappedHandlerMethod = function(httpMethod, handlerMethodDefinition, handlerMethodName, resourceDefinition) {
    return function(request, response, next) {
        var handlerMethod = handlerMethodDefinition[handlerMethodName];
        
        var requestContext = createContextForHandlerMethod(request, response);
        
        var httpMethodBehavior = httpMethodSpecificBehavior.forHttpMethod(httpMethod);

        var handlerMethodArguments = populateArgumentsFromRequest(request, handlerMethod);

        httpMethodBehavior.augmentHandlerArguments(handlerMethodArguments, request);
        
        var returned = handlerMethod.apply(requestContext, handlerMethodArguments);

        setReturnedAsResponseBodyIfAppropriate(returned, response);
    };
};

var setReturnedAsResponseBodyIfAppropriate = function(returned, response) {
    response.send(returned);
}

module.exports = createWrappedHandlerMethod;