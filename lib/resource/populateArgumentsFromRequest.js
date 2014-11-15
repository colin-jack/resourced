var _u = require('underscore');
var rules = require('rules');

var InjectedDependencyNamesStartWith = "$";

// Express will normally pass in request/response but we instead look for parameters to the handler method that 
// have a name that matches an HTTP request parameter name and pass them. Thus if you have an "id" request parameter with
// value of 5 and a parameter named "id" then the 5 is passed in for that parameter.
// Note that parameters take precedence over query string values.
var populateArgumentsFromRequest = function(context, dependencyResolver, handlerMethod) {
    var handlerMethodArguments = [];
    
   // debugger;

    if (handlerMethod.length === 0) {
        return handlerMethodArguments;
    }

    var urlSchema = handlerMethod.urlSchema;
            
    var handlerArgumentNames = getArgumentNames(handlerMethod);
    var valuesFromRequest = getPotentialArgumentValuesFromRequest(context);

    for (var i = 0, paramCount = handlerArgumentNames.length; i < paramCount; i++) {
        var argumentName = handlerArgumentNames[i];

        var argumentValue = getArgumentValue(argumentName, valuesFromRequest, handlerMethodArguments, dependencyResolver);
        handlerMethodArguments.push(argumentValue);
    }

    return handlerMethodArguments;
};

var getArgumentValue = function(argumentName, valuesFromRequest, handlerMethodArguments, dependencyResolver) {
    if (argumentName.startsWith(InjectedDependencyNamesStartWith)) {
        return tryToResolveDependency(argumentName, handlerMethodArguments, dependencyResolver);
    }
    else if (argumentName in valuesFromRequest) {
        return valuesFromRequest[argumentName];
    }
    //// TODO: Remove -1
    //else if (index < paramCount - 1)
    //{
    return undefined;
    //}
}

var tryToResolveDependency = function(argumentName, handlerMethodArguments, dependencyResolver) {
    if (!dependencyResolver) throw new Error("Dependency resolution is not supported as not dependnecy resolve was provided. Failed to resolve '" + argumentName + '"');
    if (dependencyName.length <= 1) throw new Error("Invalid dependency name: '" + argumentName + '"');

    var dependencyName = argumentName.substring(1);
    var toInject = dependencyResolver.resolve(dependencyName);

    return toInject;
}

var getPotentialArgumentValuesFromRequest = function(context) {
    // NOTE - params take precedence
    return _u.defaults(context.params, context.request.query);
}

var getArgumentNames = function(toGetFor) {
    var functionAsString = toGetFor.toString();
    return functionAsString.slice(functionAsString.indexOf('(')+1, functionAsString.indexOf(')')).match(/([^\s,]+)/g);
}

module.exports = populateArgumentsFromRequest;