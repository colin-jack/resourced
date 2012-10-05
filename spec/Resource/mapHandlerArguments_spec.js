var vows = require('vows'),
    assert = require('assert'),
    sinon = require('sinon'),
    resourceObjectMother = require('./../util/resourceObjectMother'),
    expressConfigurationSpy = require('./../util/expressConfigurationSpy');

vows.describe('resource with single get method').addBatch({
    'when you trigger the wrapped handler method': {        
        topic: function () { 
            var resourceSpy = resourceObjectMother.createGetOnlyResourceSpy();
            var expressSpy = expressConfigurationSpy("get", resourceSpy);

            // NOTE - These are mapped to the arguments of the wrapped handler method
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

        'should not get an error' : function(returned) {
            assert.isFalse(returned instanceof Error, returned.toString());
        },

        'should populate handler arguments with request parameters, matching on name': function (resourceSpy) {
            assert.deepEqual(resourceSpy.getArgumentsPassedToGetMethod(), [3, 2, 1]);
        },
    }
}).export(module);