var vows = require('vows'),
	assert = require('assert'),
    sinon = require('sinon'),
    resourceObjectMother = require('./util/resourceObjectMother'),
    expressConfigurationSpy = require('./util/expressConfigurationSpy');

vows.describe('resource configuration').addBatch({
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
    },

    'when you trigger the wrapped handler method': {        
        topic: function () {  
            var resourceSpy = resourceObjectMother.createGetOnlyResourceSpy();
            var expressSpy = expressConfigurationSpy("get", resourceSpy);

            // NOTE - These are mapped to
            var stubRequest =  {
                params: {
                    "first" : 1,
                    "second" : 2,
                    "third" : 3
                }
            };

            resourceSpy.configureExpress(expressSpy.stubExpress);

            expressSpy.triggerWrappedHandlerMethod(stubRequest);

            return resourceSpy;
        },

        'should populate handler arguments with request parameters, matching on name': function (resourceSpy) {
            assert.deepEqual(resourceSpy.getArgumentsPassedToGetMethod(), [3, 2, 1]);
        }
    }
}).export(module);