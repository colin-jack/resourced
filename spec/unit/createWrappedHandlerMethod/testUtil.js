var createGetHandlerMethodDefinition = function(toReturn) {
    var toWrap = function() {
        return toReturn;
    };

    var handlerMethodDefinition = {
        get: toWrap
    };

    return handlerMethodDefinition;
}

var createFakeResponse = function() {
    return { send: function() {} };
};

var createFakeRequest  = function() {
   return {
        params: {
            id: "bob"
        }
    }
}

module.exports = {
    createGetHandlerMethodDefinition : createGetHandlerMethodDefinition,
    createFakeResponse : createFakeResponse,
    createFakeRequest : createFakeRequest
}