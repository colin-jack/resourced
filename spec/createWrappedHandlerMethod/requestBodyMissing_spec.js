

var vows = require('vows'),
    assert = require('assert'),
    sinon = require('sinon'),
    requestResponseBuilder = require('./../util/requestResponseBuilder'),
    createWrappedHandlerMethod = require('./../testFixture').require('createWrappedHandlerMethod');

var callWrappedHandlerWithNoBody = function (httpMethod) {  
    var fakeRequest = {
        params: {}
    };

    var wrapped = createWrappedHandlerMethod(httpMethod, function() {});

    wrapped(fakeRequest, requestResponseBuilder.createFakeResponse());
};

vows.describe('wrapped handler method').addBatch({
    'when you call a wrapped handler method associated with PUT but there is no request body' : {
        topic: callWrappedHandlerWithNoBody("put"),

        'should raise a suitable exception' : function(error) {
            assert.instanceOf(error, Error);
            assert.isTrue(error.message === "No request body provided.")
        }
    }
}).export(module);