var vows = require('vows'),
    assert = require('assert'),
    sinon = require('sinon'),
    requestResponseBuilder = require('./../util/requestResponseBuilder'),
    createWrappedHandlerMethod = require('./../testFixture').require('createWrappedHandlerMethod');

var bodyFromRequest = {
    foo: "bar"
};

vows.describe('wrapped handler method').addBatch({
    'when you call a wrapped handler method associated with PUT' : {
        topic: function () {  
            var bodySendToHandler;

            var toWrap = function(id, body) {
                bodySendToHandler = body;
            };

            var fakeRequest = {
                params: { 
                    "id" : 5
                },
                body: bodyFromRequest
            };

            var wrapped = createWrappedHandlerMethod("put", toWrap);

            wrapped(fakeRequest, requestResponseBuilder.createFakeResponse());

            debugger;

            this.callback(bodySendToHandler);
        },

        'should pass in response body as last argument' : function(bodySendToHandler) {
            assert.equal(bodySendToHandler, bodyFromRequest);
        }
    },
    'when you call a wrapped handler method associated with PUT' : {
        topic: function () {  
            var bodySendToHandler;

            var toWrap = function(id, body) {
                bodySendToHandler = body;
            };

            var fakeRequest = {
                params: { 
                    "id" : 5
                },
                body: bodyFromRequest
            };

            var wrapped = createWrappedHandlerMethod("put", toWrap);

            wrapped(fakeRequest, requestResponseBuilder.createFakeResponse());

            debugger;

            this.callback(bodySendToHandler);
        },

        'should also be able to access body from request' : function() {
            
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