var vows = require('vows'),
    assert = require('assert'),
    Resource = require('./../testFixture').require('Resource');

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

    'when the resource URL is not valid': 'NYI - Consider flatiron / revalidator, covers not starting with / or invalid characters too',
    'when the resource URL is an absolute URL': 'NYI - Consider flatiron / revalidator',    
    'when the resource cache value is not a caching definition object': 'NYI - Consider flatiron / revalidator',    
}).export(module);