var _u = require('underscore');

var mergeHandlerAndOptions = function(handlerMethodName, handler, options) {
    var basic = {
    };
    basic[handlerMethodName] = handler;

    return _u.extend(basic, options);
}

// When specifying the responds to collection on a resource you can either pass in objects or call these helper methods that
// return suitably configured objects.
var http = {
    get: function(handler, options) {
        return mergeHandlerAndOptions("get", handler, options);
    },
    put: function(handler, options) {
        return mergeHandlerAndOptions("put", handler, options);
    },
    post: function(handler, options) {
        return mergeHandlerAndOptions("post", handler, options);
    },
    del: function(handler, options) {
        return mergeHandlerAndOptions("destroy", handler, options);
    },
    destroy: function(handler, options) {
        return mergeHandlerAndOptions("destroy", handler, options);
    }
}

module.exports = http;