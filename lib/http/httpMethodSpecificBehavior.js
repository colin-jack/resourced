var getBehavior = {
    augmentHandlerArguments : function(handlerMethodArguments, request) {
    },

    prepareResponse: function(returned, response) {
        debugger;
        response.send(returned);
    }
};

var putBehavior = {
    augmentHandlerArguments : function(handlerMethodArguments, request) {
    },

    prepareResponse: function(returned, response) {
    }
};

var postBehavior = {
    augmentHandlerArguments : function(handlerMethodArguments, request) {
    },

    prepareResponse: function(returned, response) {
    }
};

var deleteBehavior = {
    augmentHandlerArguments : function(handlerMethodArguments, request) {
    },

    prepareResponse: function(returned, response) {
    }
};

var forHttpMethod = function(httpMethod) {
    switch(httpMethod) {
        case "get":
            return getBehavior;
        case "put":
            return putBehavior;
        case "delete":  
            return deleteBehavior;
        case "post":
            return postBehavior;
    }

};

httpMethodSpecificBehavior = {
    forHttpMethod : forHttpMethod
};

module.exports = httpMethodSpecificBehavior;