var vows = require('vows'),
    assert = require('assert'),
    resourceObjectMother = require('./../util/resourceObjectMother');

vows.describe('generating relative link to resource').addBatch({
    'when you generate a link to a simple resource': {
        topic: function () {  
            var resource = resourceObjectMother.createGetOnlyResource({ url: "/:id/:idTwo/:somethingElse"});
            
            return resource.getLink("myRel", { id: 1, idTwo: 4, somethingElse: 2});
        },

        'should not get an error' : function(topic) {
            assert.isFalse(topic instanceof Error, topic.toString());
        },

        'should get expected value' : function(link) {
            assert.equal(link.url, "/1/4/2");
            assert.equal(link.rel, "myRel");
        }
    }
}).export(module);