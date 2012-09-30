var vows = require('vows'),
    assert = require('assert');

vows.describe('integration test of get request').addBatch({
    'when you make an HTTP GET request for a resource': {
        
        topic: function () {  
        },

        'should not get an error' : function(returned) {
            assert.isFalse(returned instanceof Error, returned.toString());
        },

        'should get expected response body' : function(expressSpy) {
            expressSpy.isFalse(true);
        },

        'should use correct URL when configuring express': function(expressSpy) {
            expressSpy.isFalse(true);
        },
    }
}).export(module);