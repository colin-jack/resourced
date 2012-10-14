// Express will normally pass in request/response but we instead look for parameters to the handler method that 
// have a name that matches an HTTP request parameter name and pass them. Thus if you have an "id" request parameter with
// value of 5 and a parameter named "id" then the 5 is passed in for that parameter.
var populateArgumentsFromRequest = function(request, handlerMethod) {
    var handlerMethodArguments = [];

    if (handlerMethod.length === 0) {
        return handlerMethodArguments;
    }
            
    var handlerArgumentNames = getArgumentNames(handlerMethod);

    for (var i = 0, paramCount = handlerArgumentNames.length; i < paramCount; i++) {
        var parameterName = handlerArgumentNames[i];

        if (parameterName in request.params) {
            handlerMethodArguments.push(request.params[parameterName]);
        }
        else if (i < paramCount -1)
        {
            // No use pushing undefined for last argument, it'll implicitly be undefined if we do nothing and
            // elsewhere we may want to push the request body into it if we do that for this kind of request
            handlerMethodArguments.push(undefined);
        }
    };

    return handlerMethodArguments;
};

var getArgumentNames = function(toGetFor) {
    var functionAsString = toGetFor.toString();
    return functionAsString.slice(functionAsString.indexOf('(')+1, functionAsString.indexOf(')')).match(/([^\s,]+)/g);
}

module.exports = populateArgumentsFromRequest;