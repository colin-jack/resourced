var fixture = require('./../../unitTestFixture')

var underTest = fixture.resourced.validateBody;

var testUtil = fixture.testLib.testUtil;

var handlerDefinitionObjectMother = require('./handlerDefinitionObjectMother');
var validationTestUtil = require('./validationTestUtil');

describe('invalid body', function() {
    describe("when the request body is validated", function() {
        var fakeResponse, handlerDefinition, returned;

        beforeEach(function() {  
            fakeResponse = testUtil.createFakeResponse();
        });  

        describe("and it is invalid", function() {
            var returned;

            beforeEach(function() {  
                var fakeRequest = testUtil.createFakeRequest();           
                fakeRequest.body = createInvalidRequestBody();

                var handlerDefinition = handlerDefinitionObjectMother.createWithIdBodyRules();
                
                var context = {
                    request: fakeRequest, 
                    response: fakeResponse
                };

                returned = underTest(context, handlerDefinition);
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
                
                validationTestUtil.shouldCorrectlyFailValidation(fakeResponse, expectedBody, returned);
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