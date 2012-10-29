var createGetHandlerMethodDefinition = function(toReturn) {
    var toWrap = function() {
        return toReturn;
    };

    var handlerMethodDefinition = {
        get: toWrap
    };

    return handlerMethodDefinition;
}

module.exports = {
    createGetHandlerMethodDefinition : createGetHandlerMethodDefinition
}