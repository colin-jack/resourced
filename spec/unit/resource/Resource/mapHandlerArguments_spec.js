var sinon = require('sinon');

var fixture = require('./../../unitTestFixture')
var assert = fixture.assert;
var resourceObjectMother = fixture.testLib.resourceObjectMother;
var koaConfigurationSpyingHelper = fixture.testLib.koaConfigurationSpyingHelper;

describe('resource with single get method', function() {
    describe('when you trigger the request handler method', function() {        
        var argumentsPassedToGetMethod = [];

        beforeEach(function () {
            var spyingGetMethod = function * (third, second, first) {
                argumentsPassedToGetMethod.push(third);
                argumentsPassedToGetMethod.push(second);
                argumentsPassedToGetMethod.push(first); 
            };

            var resourceSpy = resourceObjectMother.createGetOnlyResource({ getMethod: spyingGetMethod});

            var spyingHelper = koaConfigurationSpyingHelper("get", resourceSpy);

            // NOTE - These are mapped to the arguments of the handling request
            var stubRequest =  {
                query: []
            };
            
            var params = {
                "first" : 1,
                "second" : 2,
                "third" : 3
            };

            resourceSpy.configure(spyingHelper.stubKoa);
            
            debugger;

            spyingHelper.triggerWrappedHandlerMethod(stubRequest, params);

            return resourceSpy;
        });

        it('should populate wrapped methods arguments with request parameters, matching on name', function () {
            assert.deepEqual(argumentsPassedToGetMethod, [3, 2, 1]);
        });
    });
});