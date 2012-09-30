var vows = require('vows'),
    assert = require('assert'),
    sinon = require('sinon'),
    resourceObjectMother = require('./../util/resourceObjectMother');

vows.describe('generating relative link to resource').addBatch({
    'when you generate a link to a simple resource': {
        topic: function () {  
            var resource = resourceObjectMother.createGetOnlyResource({ url: "/:first/:second/:third"});
            
            return resource.getUri({ first: 1, second: 2, third: 3});
        },

        'should not get an error' : function(topic) {
            assert.isFalse(topic instanceof Error, topic.toString());
        },

        'should get expected value' : function(url) {
            assert.areEqual(url, "/1/2/3");
        }
    },

    // TODO: absolute
    // TODO: complex
}).export(module);