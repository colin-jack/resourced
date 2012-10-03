var vows = require('vows'),
    assert = require('assert'),
    Resource = require('./../underTestNamespace').require('Resource');

vows.describe('errors specifying resource').addBatch({
    'when you omit the URL when defining a resource': {
        topic: function () {           
            return new Resource({
                respondsTo: [
                    {
                        get: function() {}
                    }
                ]
            });
        },

        'should get an error' : function(error) {
            assert.instanceOf(error, Error);
        }
    },
}).export(module);