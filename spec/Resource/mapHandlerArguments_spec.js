var assert = require('chai').assert,
    sinon = require('sinon'),
    resourceObjectMother = require('./../util/resourceObjectMother'),
    expressConfigurationSpy = require('./../util/expressConfigurationSpy');

describe('resource with single get method', function() {
    describe('when you trigger the wrapped handler method', function() {        
        var resourceSpy;

        beforeEach(function () { 
            resourceSpy = resourceObjectMother.createGetOnlyResourceSpy();
            var expressSpy = expressConfigurationSpy("get", resourceSpy);

            // NOTE - These are mapped to the arguments of the wrapped handler method
            var stubRequest =  {
                params : {
                    "first" : 1,
                    "second" : 2,
                    "third" : 3
                }
            };

            resourceSpy.configureExpress(expressSpy.stubExpress);

            expressSpy.triggerWrappedHandlerMethod(stubRequest);

            return resourceSpy;
        });

        it('should not get an error', function() {
            assert.isFalse(resourceSpy instanceof Error, resourceSpy.toString());
        });

        it('should populate handler arguments with request parameters, matching on name', function () {
            assert.deepEqual(resourceSpy.getArgumentsPassedToGetMethod(), [3, 2, 1]);
        });
    });
});