var HttpMethod = lib.require('HttpMethod'), 
    format = require('util').format;

var getHttpMethodToUseForHandler = function(handlerMethodDefinition, handlerMethodName) {
    if (handlerMethodDefinition.httpMethod) {
        return handlerMethodDefinition.httpMethod;
    }

    var methodName = handlerMethodName.toLowerCase();

    var httpMethod = HttpMethod.mapFrom(methodName);

    if (httpMethod === undefined)
    {
        var message = format("Could not work out what http verb to use for method %s", handlerMethodName);
        throw new Error(message)
    }

    return httpMethod;
}

module.exports = getHttpMethodToUseForHandler;