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

var createResourceHandler = function(handlerMethod) {
    var requestHandler = function(request, response, next) {
        // We want the context ('this') inside the handler method to be this object
        var requestContext = {
            request: request, 
            response: response
        };

        debugger;

        var handlerMethodArguments = getHandlerMethodArguments(request, handlerMethod);

        handlerMethod.apply(requestContext, handlerMethodArguments);
    };

    return requestHandler;
};

module.exports = createResourceHandler;