var assert = require('assert');

describe('integration test of get request', function() {
    describe('when you make an HTTP GET request for a resource', function() {

        it('should not get an error' : function(returned) {
            assert.isFalse(returned instanceof Error, returned.toString());
        };

        it('should get expected response body' : function(expressSpy) {
            expressSpy.isFalse(true);
        };

        it('should use correct URL when configuring express': function(expressSpy) {
            expressSpy.isFalse(true);
        };
    });
});