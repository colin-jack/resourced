var vows = require('vows'),
    assert = require('assert'),
    sinon = require('sinon'),
    createWrappedHandlerMethod = require('./../underTestNamespace').require('createWrappedHandlerMethod');

var returnedFromWrapped = {
};

vows.describe('wrapped handler method').addBatch({
    'when you return a response from a handler method associated with http method GET': {
        
        topic: function () {  
            var fakeResponse = { send: function() {} };
            var responseSendSpy = sinon.spy(fakeResponse, "send");

            var toWrap = function() {
                return returnedFromWrapped;
            };

            var wrapped = createWrappedHandlerMethod(toWrap);

            debugger;
            wrapped({}, fakeResponse);

            return responseSendSpy;
        },

        'should use the returned object as response body' : function(responseSendSpy) {
            assert.isTrue(responseSendSpy.calledOnce);
            assert.equal(returnedFromWrapped, responseSendSpy.firstCall.args[0]);
        }
    },
}).export(module);