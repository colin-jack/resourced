var _u = require('underscore'),
    lib = require('require-namespace').lib,
    HttpMethod = lib.HttpMethod,
    populateArgumentsFromRequest = lib.populateArgumentsFromRequest,
    httpMethodSpecificBehavior = lib.httpMethodSpecificBehavior,
    getHttpMethodToUseForHandler = lib.getHttpMethodToUseForHandler,
    validateUrl = lib.validateUrl,
    validateBody = lib.validateBody,
    createUrl = lib.createUrl;

// We want the context ('this') inside the handler method to be the returned object
var createContextForHandlerMethod = function createContextForHandlerMethod(request, response, httpMethod) {
    return {
        request: createRequestWrapper(request), 
        response: createResponseWrapper(response, httpMethod),
        urlFor: createUrlForWrapper(request)
    };
};

var createUrlForWrapper = function createUrlForWrapper(request) {
    return function(resource, options) {
        return createUrl(resource.resourceDefinition, options, request);
    }
};

// We want to control the interface, providing just a subset of the request methods and using
// a resource oriented style.
var createRequestWrapper = function createRequestWrapper(request) {
    return {
        body: request.body
    };
};

var createResponseWrapper = function createResponseWrapper(response, httpMethod) {
    var responseWrapper = {
        send: function (toSend) {
            response.send(toSend);
        }
    };
    
    // TODO: Test this
    if (httpMethod === HttpMethod.GET) {
        responseWrapper.render = function () {
            this.__responsePopulated = true;
           
            response.render.apply(response, arguments);
        }
    }

    return responseWrapper;
};

var getHandlerMethodArguments = function getHandlerMethodArguments(request, handlerMethod, httpMethod) {
    var handlerMethodArguments = populateArgumentsFromRequest(request, handlerMethod);

    var httpMethodBehavior = httpMethodSpecificBehavior.forHttpMethod(httpMethod);
    httpMethodBehavior.augmentHandlerArguments(handlerMethodArguments, request);

    return handlerMethodArguments;
}

var isRequestValid = function isRequestValid(request, response, handlerMethodDefinition, resourceDefinition) {
    if (validateUrl(request, response, handlerMethodDefinition, resourceDefinition) === false) {
        return false;
    }

    if (validateBody(request, response, handlerMethodDefinition) === false) {
        return false;
    }

    return true;
}

// handlerMethod is the function that will be registered to handle a specific type of HTTP request,
// here we wrap it with our own custom proxy function which is returned.
var createRequestHandler = function createRequestHandler(httpMethod, handlerMethodDefinition, handlerMethodName, resourceDefinition) {
    return function(request, response, next) {
        if (!isRequestValid(request, response, handlerMethodDefinition, resourceDefinition)) {
            return;
        }

        var handlerMethod = handlerMethodDefinition[handlerMethodName];

        httpMethod = getHttpMethodToUseForHandler(handlerMethodDefinition, handlerMethodName);
        
        var requestContext = createContextForHandlerMethod(request, response, httpMethod);

        var handlerMethodArguments = getHandlerMethodArguments(request, handlerMethod, httpMethod);
        
        var returned = handlerMethod.apply(requestContext, handlerMethodArguments);

        setReturnedAsResponseBodyIfAppropriate(returned, requestContext);
    };
};

var setReturnedAsResponseBodyIfAppropriate = function setReturnedAsResponseBodyIfAppropriate(returned, requestContext) {
    if (requestContext.response.__responsePopulated === true) return;

    requestContext.response.send(returned);
}

module.exports = {
    create: createRequestHandler
};