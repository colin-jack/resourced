var vows = require('vows'),
    assert = require('assert');

// TODO: Fill in.
vows.describe('wrapped handler method').addBatch({
    'when you call a wrapped handler method': {
        
        topic: function () {  
        },

        'should populate parameters based on values from request' : function(returned) {
            assert.isFalse(returned instanceof Error, returned.toString());
        },

        'should set correct default status code on response' : function(expressSpy) {
            expressSpy.isFalse(true);
        }
    },

    'when there is a generic error from the the logic called by the wrapped handler method': {        
        topic: function () {  
        },

        'should have response status code of 500': function (resourceSpy) {
            assert.equal(true, false);
        },
    },

    'when there is a custom error from the the logic called by the wrapped handler method': {        
        topic: function () {  
        },

        'should use associated response code': function (resourceSpy) {
            assert.equal(true, false);
        },
    }
}).export(module);