var _u = require('underscore');

var mergeHandlerAndOptions = function(handlerMethodName, handler, configuration) {
    var basic = {
    };

    basic[handlerMethodName] = handler;

    return _u.extend(basic, configuration);
}

/*
When specifying the responds to collection on a resource you can either pass in objects or call these helper methods that
return suitably configured objects.

@param <function> handler The handler function
@param <object> configuration An objects with configuration to use for the requests, this will over-ride any resource level configuration.
@returns <object> An object with the handler in a suitably named method ("get"/"put" etc) and the configuration merged in.
*/
var http = {
    get: function(handler, configuration) {
        return mergeHandlerAndOptions("get", handler, configuration);
    },
    put: function(handler, configuration) {
        return mergeHandlerAndOptions("put", handler, configuration);
    },
    post: function(handler, configuration) {
        return mergeHandlerAndOptions("post", handler, configuration);
    },
    del: function(handler, configuration) {
        return mergeHandlerAndOptions("destroy", handler, configuration);
    },
    destroy: function(handler, configuration) {
        return mergeHandlerAndOptions("destroy", handler, configuration);
    }
}

module.exports = http;