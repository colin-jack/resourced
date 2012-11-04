var getBehavior = {
    augmentHandlerArguments : function(handlerMethodArguments, request) {
    }
};

var putBehavior = {
    augmentHandlerArguments : function(handlerMethodArguments, request) {
        handlerMethodArguments.push(request.body);
    }
};

var postBehavior = {
    augmentHandlerArguments : function(handlerMethodArguments, request) {
        handlerMethodArguments.push(request.body);
    }
};

var deleteBehavior = {
    augmentHandlerArguments : function(handlerMethodArguments, request) {
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

var httpMethodSpecificBehavior = {
    forHttpMethod : forHttpMethod
};

module.exports = httpMethodSpecificBehavior;