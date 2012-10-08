var HttpMethod = lib.require('HttpMethod'), 
    format = require('util').format;

var getHttpMethodToUseForHandler = function(handlerMethodDefinition, handlerMethodName) {
    if (handlerMethodDefinition.httpMethod) {
        return handlerMethodDefinition.httpMethod;
    }

    var methodName = handlerMethodName.toLowerCase();

    debugger;

    if (HttpMethod.canHandle(methodName) === false)
    {
        var message = format("Could not work out what http verb to use for method %s", handlerMethodName);
        throw new Error(message)
    }

    return methodName;
}

module.exports = getHttpMethodToUseForHandler;