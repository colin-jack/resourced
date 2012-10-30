var createGetHandlerMethodDefinition = function(toReturn) {
    var toWrap = function() {
        return toReturn;
    };

    var handlerMethodDefinition = {
        get: toWrap
    };

    return handlerMethodDefinition;
}

var createResponseSpy = function() {
    return { 
        send: function() {},
        status: function(status) { this.setStatus = status }
    };
};

var createFakeRequest  = function(params) {
    params = params || { id: 5 }

    return {
        params: params
    }
}

module.exports = {
    createGetHandlerMethodDefinition : createGetHandlerMethodDefinition,
    createResponseSpy : createResponseSpy,
    createFakeRequest : createFakeRequest
}