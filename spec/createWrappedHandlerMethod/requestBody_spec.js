var vows = require('vows'),
    assert = require('assert'),
    sinon = require('sinon'),
    requestResponseBuilder = require('./../util/requestResponseBuilder'),
    createWrappedHandlerMethod = require('./../testFixture').require('createWrappedHandlerMethod');

var bodyFromRequest = {
    foo: "bar"
};

var callWrappedHandler = function(toWrap, httpMethod) {
    var fakeRequest = {
        params: { 
            "id" : 5
        },
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

vows.describe('wrapped handler method').addBatch({
    'when you call a wrapped handler method associated with PUT' : {
        topic: callWrappedHandlerAndReturnBodyPassedIn("put"),

        'should pass in response body as last argument' : function(bodySendToHandler) {
            assert.equal(bodySendToHandler, bodyFromRequest);
        }
    },

    'when you call a wrapped handler method associated with PUT and access request body in handler' : {
        topic: callWrappedHandlerAndReturnRequestBody("put"),

        'should get appropriate value' : function(bodyInRequestInHandler) {
            assert.equal(bodyInRequestInHandler, bodyFromRequest);
        }
    },    

    'when you call a wrapped handler method associated with POST' : {
        topic: callWrappedHandlerAndReturnBodyPassedIn("post"),

        'should pass in response body as last argument' : function(bodySendToHandler) {
            assert.equal(bodySendToHandler, bodyFromRequest);
        }
    },

    'when you call a wrapped handler method associated with POST and access request body in handler' : {
        topic: callWrappedHandlerAndReturnRequestBody("post"),

        'should get appropriate value' : function(bodyInRequestInHandler) {
            assert.equal(bodyInRequestInHandler, bodyFromRequest);
        }
    }
}).export(module);