var lib = require('require-namespace').lib,
    HttpMethod = lib.require('HttpMethod'), 
    format = require('util').format;

var getHttpMethodToUseForHandler = function(handlerMethodDefinition, handlerMethodName) {
    if (handlerMethodDefinition.httpMethod) {
        return mapToHttpMethodValue(handlerMethodDefinition.httpMethod);
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

/*
We only do this so that if the httpMethod property value was something like "POST" or "PoSt" it'd be mapped
to the fully uppercase version expected elsewhere in the system
*/
var mapToHttpMethodValue = function mapToHttpMethodValue(httpMethodPropertyValue) {
    var httpMethod = HttpMethod.mapFrom(httpMethodPropertyValue.toString());

    if (httpMethod === undefined)
    {
        var message = format("The 'httpMethod' value '%s' was invalid.", httpMethodPropertyValue);
        throw new Error(message)
    }

    return httpMethod;
}

module.exports = getHttpMethodToUseForHandler;