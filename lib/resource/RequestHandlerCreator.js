var resourced = require('require-namespace').resourced;
var HttpMethod = resourced.HttpMethod;
var populateArgumentsFromRequest = resourced.populateArgumentsFromRequest;
var httpMethodSpecificBehavior = resourced.httpMethodSpecificBehavior;
var getHttpMethodToUseForHandler = resourced.getHttpMethodToUseForHandler;
var validateUrl = resourced.validateUrl;
var validateBody = resourced.validateBody;
var createUrl = resourced.createUrl;

// We want the context ('this') inside the handler method to be the returned object
var createContextForHandlerMethod = function createContextForHandlerMethod(request, response, httpMethod) {
    return {
        request: createRequestWrapper(request), 
        response: createResponseWrapper(response, httpMethod),
        urlFor: createUrlForWrapper(request)
    };
};

var createUrlForWrapper = function createUrlForWrapper(request) {
    return function (resource, options) {
        //debugger;
        return createUrl(resource.resourceDefinition, options, request);
    }
};

// We want to control the interface, providing just a subset of the request methods and using
// a resource oriented style.
var createRequestWrapper = function createRequestWrapper(request) {
    return request;
};

var createResponseWrapper = function createResponseWrapper(response, httpMethod) {
    return response;
};

var getHandlerMethodArguments = function getHandlerMethodArguments(context, request, handlerMethod, httpMethod, dependencyResolver) {
    var handlerMethodArguments = populateArgumentsFromRequest(context, dependencyResolver, handlerMethod);

    var httpMethodBehavior = httpMethodSpecificBehavior.forHttpMethod(httpMethod);
    httpMethodBehavior.augmentHandlerArguments(handlerMethodArguments, request);

    return handlerMethodArguments;
}

var isRequestValid = function isRequestValid(context, handlerMethodDefinition, resourceDefinition) {
    //debugger;
    if (validateUrl(context, handlerMethodDefinition, resourceDefinition) === false) {
        return false;
    }

    if (validateBody(context, handlerMethodDefinition) === false) {
        return false;
    }

    return true;
}

var setReturnedAsResponseBodyIfAppropriate = function setReturnedAsResponseBodyIfAppropriate(returned, context) {
    if (!returned || (context.response.body !== undefined && context.response.body !== null)) return;
    
    context.response.body = returned;
}

// handlerMethod is the function that will be registered to handle a specific type of HTTP request,
// here we wrap it with our own custom proxy function which is returned.
var createRequestHandler = function createRequestHandler(httpMethod, handlerMethodDefinition, handlerMethodName, resourceDefinition, dependencyResolver) {
    //debugger;
    return function * () {
        var request = this.request;
        var response = this.response;
        
        this.urlFor = createUrlForWrapper(request);

        if (!isRequestValid(this, handlerMethodDefinition, resourceDefinition)) {
            return;
        }

        var handlerMethod = handlerMethodDefinition[handlerMethodName];

        httpMethod = getHttpMethodToUseForHandler(handlerMethodDefinition, handlerMethodName);
        
        //var requestContext = createContextForHandlerMethod(request, response, httpMethod);
        
        var handlerMethodArguments = getHandlerMethodArguments(this, request, handlerMethod, httpMethod, dependencyResolver);
        
        // be optimistic
        this.response.status = 200;
        
        //var returned = handlerMethod.apply(requestContext, handlerMethodArguments);
        
        debugger;
        
        var returned = yield * handlerMethod.apply(this, handlerMethodArguments);
        
        setReturnedAsResponseBodyIfAppropriate(returned, this);

        //next();
    };
};

module.exports = {
    create: createRequestHandler
};