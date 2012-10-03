var vows = require('vows'),
    assert = require('assert'),
    sinon = require('sinon'),
    resourceObjectMother = require('./../util/resourceObjectMother');

vows.describe('generating relative link to resource').addBatch({
    'when you generate a link to a simple resource': {
        topic: function () {  
            var resource = resourceObjectMother.createGetOnlyResource({ url: "/:id/:idTwo/:somethingElse"});
            
            return resource.getUri({ id: 1, idTwo: 4, somethingElse: 2});
        },

        'should not get an error' : function(topic) {
            assert.isFalse(topic instanceof Error, topic.toString());
        },

        'should get expected value' : function(url) {
            assert.equal(url, "/1/4/2");
        }
    },

    // TODO: absolute
    // TODO: complex
}).export(module);