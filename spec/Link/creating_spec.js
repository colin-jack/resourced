var vows = require('vows'),
    assert = require('assert'),
    Link = require('./../testFixture').require('Link');

vows.describe('errors specifying resource').addBatch({
    'when you provide all values when creating a link': {
        topic: function () {           
            return new Link("linkRel", "foo.com");
        },

        'should not get an error' : function(returned) {
            assert.isFalse(returned instanceof Error, returned.toString());
        }
    },

    'when you only provide rel value when creating a link': {
        topic: function () {           
            return new Link("bob");
        },

        'should get an error' : function(error) {
            assert.instanceOf(error, Error);
        }
    },

    'when you only provide url value when creating a link': {
        topic: function () {           
            return new Link(undefined, "foo.com");
        },

        'should get an error' : function(error) {
            assert.instanceOf(error, Error);
        }
    },
}).export(module);