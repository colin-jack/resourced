var vows = require('vows'),
	assert = require('assert'),
    namespace = require('require-namespace'),
    log = require('util').log;

vows.describe('require all files in directory').addBatch({
    'when requiring a simple hierarchy': {
        topic: function (done) {  
            done();
        },
        'we can require a module with dependencies based on a namespace in a global object': function (err, namespace) {
                assert.equal(42, 42);
     },

    }
}).export(module);