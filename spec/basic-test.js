var vows = require('vows'),
	assert = require('assert'),
    namespace = require('require-namespace'),
    log = require('util').log;

vows.describe('require all files in directory').addBatch({
    'when specifying a resource with get method': {
        topic: function (done) {  
            
            done();
        },
        'all provided request parameters should be passed in': function (err, resourceDefinition) {
                assert.equal(42, 42);
        },
        'all missing request parameters should be undefined': function (err, resourceDefinition) {
                assert.equal(42, 42);
        },
    }
}).export(module);