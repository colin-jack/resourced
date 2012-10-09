// When specifying the responds to collection on a resource you can either pass in objects or call these helper methods that
// return suitably configured objects.

var http = {
    get: function(handler) {
        return {
            get : handler
        };
    },
    put: function(handler) {
        return {
            put : handler
        };
    },
    post: function(handler) {
        return {
            post : handler
        };
    },
    delete: function(handler) {
        return {
            "delete" : handler
        };
    }
}

module.exports = http;