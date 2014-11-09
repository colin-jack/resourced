var sinon = require('sinon');

var fixture = require('./../../unitTestFixture')
var assert = fixture.assert;
var resourceObjectMother = fixture.testLib.resourceObjectMother;
var expressConfigurationSpy = fixture.testLib.expressConfigurationSpy;

describe('resource with single get method', function() {
    describe('when you trigger the handling request', function() {        
        var argumentsPassedToGetMethod = [];

        beforeEach(function () { 
            var spyingGetMethod = function(third, second, first) {
                argumentsPassedToGetMethod.push(third);
                argumentsPassedToGetMethod.push(second);
                argumentsPassedToGetMethod.push(first); 
            };

            var resourceSpy = resourceObjectMother.createGetOnlyResource({ getMethod: spyingGetMethod});

            var expressSpy = expressConfigurationSpy("get", resourceSpy);

            // NOTE - These are mapped to the arguments of the handling request
            var stubRequest =  {
                params : {
                    "first" : 1,
                    "second" : 2,
                    "third" : 3
                },
                query: []
            };

            resourceSpy.configureExpress(expressSpy.stubExpress);

            expressSpy.triggerWrappedHandlerMethod(stubRequest);

            return resourceSpy;
        });

        it('should populate handler arguments with request parameters, matching on name', function () {
            assert.deepEqual(argumentsPassedToGetMethod, [3, 2, 1]);
        });
    });
});