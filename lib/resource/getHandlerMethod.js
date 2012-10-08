var _u = require('underscore');

// The handler method definition should be an object with one method, the method being the handler for that type of HTTP request.
// When passed the handler method definition this thus returns the first method.
var getHandlerMethod = function(handlerMethodDefinition) {
    return _u.functions(handlerMethodDefinition)[0];
}

module.exports = getHandlerMethod;