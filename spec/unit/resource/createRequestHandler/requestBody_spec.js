var assert = require('chai').assert,
    sinon = require('sinon'),
    requestResponseBuilder = testLib.require('requestResponseBuilder'),
    createRequestHandler = lib.require('createRequestHandler');

var bodyFromRequest = {
    foo: "bar"
};

var callWrappedHandler = function(toWrap, httpMethod) {
    var fakeRequest = {
        params : { 
            "id" : 5
        },

        body: bodyFromRequest
    };

    var resourceDefinition = {};

    var handlerMethodDefinition = {
        get: toWrap
    };

    var wrapped = createRequestHandler(httpMethod, handlerMethodDefinition, "get", resourceDefinition);

    wrapped(fakeRequest, requestResponseBuilder.createResponseSpy());
};

var callWrappedHandlerAndReturnBodyPassedIn = function (httpMethod) {
    var bodySendToHandler;

    var toWrap = function(id, body) {
        bodySendToHandler = body;
    };

    callWrappedHandler(toWrap, httpMethod);

    return bodySendToHandler;
};

var callWrappedHandlerAndReturnRequestBody = function (httpMethod) {  
    var bodyInRequestInHandler;

    var toWrap = function(id, body) {
        bodyInRequestInHandler = this.request.body;
    };

    callWrappedHandler(toWrap, httpMethod);

    return bodyInRequestInHandler;
};

describe('handling request', function() {
    describe('when you call a handling request associated with PUT', function() {
        it('should pass in response body as last argument', function() {
            var bodySentToHandler = callWrappedHandlerAndReturnBodyPassedIn("put");
            assert.equal(bodySentToHandler, bodyFromRequest);
        });
    });

    describe('when you call a handling request associated with PUT and access request body in handler', function() {
        it('should get appropriate value', function() {
            var bodyInRequestInHandler = callWrappedHandlerAndReturnRequestBody("put");
            assert.equal(bodyInRequestInHandler, bodyFromRequest);
        });
    });

    describe('when you call a handling request associated with POST', function() {
        it('should pass in response body as last argument', function() {
            var bodySentToHandler = callWrappedHandlerAndReturnBodyPassedIn("post");
            assert.equal(bodySentToHandler, bodyFromRequest);
        });
    });

    describe('when you call a handling request associated with POST and access request body in handler', function() {
        it('should get appropriate value', function() {
            var bodyInRequestInHandler = callWrappedHandlerAndReturnRequestBody("post");
            assert.equal(bodyInRequestInHandler, bodyFromRequest);
        });
    });
});