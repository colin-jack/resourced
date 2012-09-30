var vows = require('vows'),
    assert = require('assert'),
    sinon = require('sinon'),
    resourceObjectMother = require('./../util/resourceObjectMother');

vows.describe('generating simple link to resource').addBatch({
    'when you generate a link to a simple resource': {
        topic: function () {  
            var resource = resourceObjectMother.createGetOnlyResource();
            
            return "";
        },

        'should not get an error' : function(topic) {
            assert.isFalse(topic instanceof Error, topic.toString());
        },

        'should get expected value' : function(url) {
            assert.areEqual(true, false);
        }
    }
}).export(module);