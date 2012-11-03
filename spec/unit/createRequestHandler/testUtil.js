var createGetHandlerMethodDefinition = function(toReturn) {
    var toWrap = function() {
        return toReturn;
    };

    var handlerMethodDefinition = {
        get: toWrap
    };

    return handlerMethodDefinition;
}

var createFakeRequest  = function(params) {
    params = params || { id: 5 }

    return {
        params: params
    }
}

module.exports = {
    createGetHandlerMethodDefinition : createGetHandlerMethodDefinition,
    createFakeRequest : createFakeRequest
}