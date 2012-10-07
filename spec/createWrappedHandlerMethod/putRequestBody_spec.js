var vows = require('vows'),
    assert = require('assert'),
    sinon = require('sinon'),
    requestResponseBuilder = require('./../util/requestResponseBuilder'),
    createWrappedHandlerMethod = require('./../testFixture').require('createWrappedHandlerMethod');

var bodyFromRequest = {
    foo: "bar"
};

var callWrappedHandler = function(toWrap) {
    var fakeRequest = {
        params: { 
            "id" : 5
        },
        body: bodyFromRequest
    };

    var wrapped = createWrappedHandlerMethod("put", toWrap);

    wrapped(fakeRequest, requestResponseBuilder.createFakeResponse());
};

vows.describe('wrapped handler method').addBatch({
    'when you call a wrapped handler method associated with PUT' : {
        topic: function () {  
            var bodySendToHandler;

            var toWrap = function(id, body) {
                bodySendToHandler = body;
            };

            callWrappedHandler(toWrap);

            return bodySendToHandler;
        },

        'should pass in response body as last argument' : function(bodySendToHandler) {
            assert.equal(bodySendToHandler, bodyFromRequest);
        }
    },

    'when you call a wrapped handler method associated with PUT and access request body in handler' : {
        topic: function () {  
            var bodyInRequestInHandler;

            var toWrap = function(id, body) {
                bodyInRequestInHandler = this.request.body;
            };

            callWrappedHandler(toWrap);

            return bodyInRequestInHandler;
        },

        'should get appropriate value' : function(bodyInRequestInHandler) {
            assert.equal(bodyInRequestInHandler, bodyFromRequest);
        }
    },    

    'when you call a wrapped handler method associated with PUT but there is no request body' : 'NYI'/*{
        topic: function () {  
          
        },

        'should raise a suitable exception' : function(exception) {
            assert.isTrue(responseSendSpy.calledOnce);
            assert.equal(returnedFromWrapped, responseSendSpy.firstCall.args[0]);
        }
    }*/
}).export(module);