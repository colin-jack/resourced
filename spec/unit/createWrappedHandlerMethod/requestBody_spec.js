var assert = require('chai').assert,
    sinon = require('sinon'),
    requestResponseBuilder = require('./../util/requestResponseBuilder'),
    createWrappedHandlerMethod = require('./../testFixture').require('createWrappedHandlerMethod');

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

    var wrapped = createWrappedHandlerMethod(httpMethod, handlerMethodDefinition, "get", resourceDefinition);

    wrapped(fakeRequest, requestResponseBuilder.createFakeResponse());
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

describe('wrapped handler method', function() {
    describe('when you call a wrapped handler method associated with PUT', function() {
        it('should pass in response body as last argument', function() {
            var bodySentToHandler = callWrappedHandlerAndReturnBodyPassedIn("put");
            assert.equal(bodySentToHandler, bodyFromRequest);
        });
    });

    describe('when you call a wrapped handler method associated with PUT and access request body in handler', function() {
        it('should get appropriate value', function() {
            var bodyInRequestInHandler = callWrappedHandlerAndReturnRequestBody("put");
            assert.equal(bodyInRequestInHandler, bodyFromRequest);
        });
    });

    describe('when you call a wrapped handler method associated with POST', function() {
        it('should pass in response body as last argument', function() {
            var bodySentToHandler = callWrappedHandlerAndReturnBodyPassedIn("post");
            assert.equal(bodySentToHandler, bodyFromRequest);
        });
    });

    describe('when you call a wrapped handler method associated with POST and access request body in handler', function() {
        it('should get appropriate value', function() {
            var bodyInRequestInHandler = callWrappedHandlerAndReturnRequestBody("post");
            assert.equal(bodyInRequestInHandler, bodyFromRequest);
        });
    });
});