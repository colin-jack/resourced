var _u = require('underscore'),
    rules = require('rules');

// Express will normally pass in request/response but we instead look for parameters to the handler method that 
// have a name that matches an HTTP request parameter name and pass them. Thus if you have an "id" request parameter with
// value of 5 and a parameter named "id" then the 5 is passed in for that parameter.
// Note that parameters take precedence over query string values.
var populateArgumentsFromRequest = function(request, handlerMethod) {
    var handlerMethodArguments = [];

    if (handlerMethod.length === 0) {
        return handlerMethodArguments;
    }

    var argumentRules = handlerMethod.argumentRules;
            
    var handlerArgumentNames = getArgumentNames(handlerMethod);
    var valuesFromRequest = getPotentialArgumentValuesFromRequest(request);

    for (var i = 0, paramCount = handlerArgumentNames.length; i < paramCount; i++) {
        var argumentName = handlerArgumentNames[i];

        if (argumentName in valuesFromRequest) {
            handlerMethodArguments.push(valuesFromRequest[argumentName]);
        }

        // TODO: Remove -1
        else if (i < paramCount - 1)
        {
            handlerMethodArguments.push(undefined)
        }
    }

    return handlerMethodArguments;
};

var getPotentialArgumentValuesFromRequest = function(request) {
    // NOTE - params take precedence
    return _u.defaults(request.params, request.query);
}

var getArgumentNames = function(toGetFor) {
    var functionAsString = toGetFor.toString();
    return functionAsString.slice(functionAsString.indexOf('(')+1, functionAsString.indexOf(')')).match(/([^\s,]+)/g);
}

module.exports = populateArgumentsFromRequest;