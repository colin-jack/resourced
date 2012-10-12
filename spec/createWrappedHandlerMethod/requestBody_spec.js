var assert = require('chai').assert,
    sinon = require('sinon'),
    requestResponseBuilder = require('./../util/requestResponseBuilder'),
    createWrappedHandlerMethod = require('./../testFixture').require('createWrappedHandlerMethod');

var bodyFromRequest = {
    foo: "bar"
};

var callWrappedHandler = function(toWrap, httpMethod) {
    var fakeRequest = {
        params : function() { 
            "id" : 5
        };
        body: bodyFromRequest
    };

    var wrapped = createWrappedHandlerMethod(httpMethod, toWrap);

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
    describe('when you call a wrapped handler method associated with PUT' , function() {
        topic: callWrappedHandlerAndReturnBodyPassedIn("put"),

        it('should pass in response body as last argument' : function(bodySendToHandler) {
            assert.equal(bodySendToHandler, bodyFromRequest);
        }
    };

    describe('when you call a wrapped handler method associated with PUT and access request body in handler' , function() {
        topic: callWrappedHandlerAndReturnRequestBody("put"),

        it('should get appropriate value' : function(bodyInRequestInHandler) {
            assert.equal(bodyInRequestInHandler, bodyFromRequest);
        }
    };    

    describe('when you call a wrapped handler method associated with POST' , function() {
        topic: callWrappedHandlerAndReturnBodyPassedIn("post"),

        it('should pass in response body as last argument' : function(bodySendToHandler) {
            assert.equal(bodySendToHandler, bodyFromRequest);
        }
    };

    describe('when you call a wrapped handler method associated with POST and access request body in handler' , function() {
        topic: callWrappedHandlerAndReturnRequestBody("post"),

        it('should get appropriate value' : function(bodyInRequestInHandler) {
            assert.equal(bodyInRequestInHandler, bodyFromRequest);
        }
    }
});