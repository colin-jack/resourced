var resourced = require('require-namespace').resourced;
var fixture = testLib.require('testFixture'),
    testUtil = testLib.require('testUtil'),
    responseTestUtil = testLib.require('responseTestUtil'),
    handlerDefinitionObjectMother = require('./handlerDefinitionObjectMother'),
    validationTestUtil = require('./validationTestUtil'),
    underTest = resourced.require('validateBody');

describe('invalid body', function() {
    describe("when the request body is validated", function() {
        var responseSpy, handlerDefinition, returned;

        beforeEach(function() {  
            responseSpy = responseTestUtil.createResponseSpy();
        });  

        describe("and it is invalid", function() {
            var returned;

            beforeEach(function() {  
                var fakeRequest = testUtil.createFakeRequest();           
                fakeRequest.body = createInvalidRequestBody();

                var handlerDefinition = handlerDefinitionObjectMother.createWithIdBodyRules();

                returned = underTest(fakeRequest, responseSpy, handlerDefinition);
            });

            it('should fail because of invalid query string', function() {
                var expectedBody = { 
                    message: "The request body was not valid.",
                    details: {
                        status: { 
                            message: 'The value must be a string.',
                            type: 'not_a_string',
                            value: 5 },
                        age: { 
                            message: 'The value must be populated.',
                            type: 'not_populated',
                            value: null 
                        } 
                    }
                }
                
                validationTestUtil.shouldCorrectlyFailValidation(responseSpy, expectedBody, returned);
            });
        });

        function createInvalidRequestBody() {
            return {
                status: 5,
                age: null
            };
        };
    });
});