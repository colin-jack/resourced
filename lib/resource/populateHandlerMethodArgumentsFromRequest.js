var populateHandlerMethodArgumentsFromRequest = function(request, handlerMethod) {
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

var getParameterNames = function(toGetFor) {
    var functionAsString = toGetFor.toString();
    return functionAsString.slice(functionAsString.indexOf('(')+1, functionAsString.indexOf(')')).match(/([^\s,]+)/g);
}

module.exports = populateHandlerMethodArgumentsFromRequest;