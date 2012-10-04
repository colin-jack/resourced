var vows = require('vows'),
    assert = require('assert'),
    sinon = require('sinon'),
    createWrappedHandlerMethod = require('./../underTestNamespace').require('createWrappedHandlerMethod');

var returnedFromWrapped = {
};

vows.describe('wrapped handler method').addBatch({
    'when you return an object from a GET handler method and do not otherwise set response body' : {
        topic: function () {  
            var fakeResponse = { send: function() {} };
            var responseSendSpy = sinon.spy(fakeResponse, "send");

            var toWrap = function() {
                return returnedFromWrapped;
            };

            var wrapped = createWrappedHandlerMethod("get", toWrap);

            wrapped({}, fakeResponse);

            return responseSendSpy;
        },

        'should use the returned object as response body' : function(responseSendSpy) {
            assert.isTrue(responseSendSpy.calledOnce);
            assert.equal(returnedFromWrapped, responseSendSpy.firstCall.args[0]);
        }
    },

    'when you return an object from a PUT handler method and do not otherwise set response body': 'NYI',
    'when you return an object from a GET handler method but also set response body': 'NYI',
    'when you return an object from a PUT handler method but also set response body': 'NYI',
    'when you return an object from a collection resources POST handler method and do not otherwise set response body': 'NYI',
    'when you return an object from a collection resources POST handler method but also set response body': 'NYI',
    'when you return an object from a POST handler method and do not otherwise set response body': 'NYI',
    'when you return an object from a DELETE handler method and do not otherwise set response body': 'NYI',
}).export(module);