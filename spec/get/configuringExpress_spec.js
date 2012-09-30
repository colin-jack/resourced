var vows = require('vows'),
	assert = require('assert'),
    sinon = require('sinon'),
    resourceObjectMother = require('./../util/resourceObjectMother'),
    expressConfigurationSpy = require('./../util/expressConfigurationSpy');

vows.describe('resource with single get method').addBatch({
    'when you use a get-only resource to configure a stubbed express': {
        
        topic: function () {  
            var resource = resourceObjectMother.createGetOnlyResource();
            var spy = expressConfigurationSpy("get");

            resource.configureExpress(spy.stubExpress);

            return spy;
        },

        'should not get an error' : function(returned) {
            assert.isFalse(returned instanceof Error, returned.toString());
        },

        'should notify express of the new GET method' : function(expressSpy) {
            expressSpy.assertCalledOnce();
        },

        'should use correct URL when configuring express': function(expressSpy) {
            expressSpy.assertUrlRegisteredWithIs("/things/:third/:first/:second");
        },
    }
}).export(module);