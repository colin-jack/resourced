var _u = require('underscore');

var getParameterNames = function(toGetFor) {
    var functionAsString = toGetFor.toString();
    return functionAsString.slice(functionAsString.indexOf('(')+1, functionAsString.indexOf(')')).match(/([^\s,]+)/g);
}

// Express will normally pass in request/response but we instead look for parameters to the handler method that 
// have a name that matches an HTTP request parameter name and pass them. Thus if you have an "id" request parameter with
// value of 5 and a parameter named "id" then the 5 is passed in for that parameter.
var getHandlerMethodArguments = function(request, handlerMethod) {
    var handlerMethodArguments = [];

    if (handlerMethod.length === 0) {
        return handlerMethodArguments;
    }
            
    var handlerParameterNames = getParameterNames(handlerMethod);

    _u.each(handlerParameterNames, function(parameterName) {
        if (parameterName in request.params) {
            handlerMethodArguments.push(request.params[parameterName]);
        }
    });

    return handlerMethodArguments;
};

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

var addRequestBodyToArgumentsIfRequired = function(httpMethod, handlerMethodArguments, body) {
    if (httpMethod === "put" || httpMethod === "post") {
        handlerMethodArguments.push(body);
    }
}

// handlerMethod is the function that will be registered to handle a specific type of HTTP request,
// here we wrap it with our own custom proxy function which is returned.
var createWrappedHandlerMethod = function(httpMethod, handlerMethod) {
    return function(request, response, next) {
        var requestContext = createContextForHandlerMethod(request, response);

        var handlerMethodArguments = getHandlerMethodArguments(request, handlerMethod);

        addRequestBodyToArgumentsIfRequired(httpMethod, handlerMethodArguments, request.body);
        
        var returned = handlerMethod.apply(requestContext, handlerMethodArguments);

        setReturnedAsResponseBodyIfAppropriate(returned, response);
    };
};

var setReturnedAsResponseBodyIfAppropriate = function(returned, response) {
    response.send(returned);
}

module.exports = createWrappedHandlerMethod;