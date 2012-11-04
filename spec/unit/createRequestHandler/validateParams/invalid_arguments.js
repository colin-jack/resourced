var fixture = require('./../../testFixture'),
    testUtil = require('./../testUtil'),
    responseTestUtil = require('./../responseTestUtil'),
    handlerDefinitionObjectMother = require('./handlerDefinitionObjectMother'),
    validateParams = fixture.require('validateParams');

describe('handling request - validating parameters', function() {
    describe("When argument validation is applied to parameters", function() {
        var responseSpy, handlerMethodDefinition;

        beforeEach(function() {  
            responseSpy = responseTestUtil.createResponseSpy();
            handlerMethodDefinition = handlerDefinitionObjectMother.createWithNameIdRules();
        });

        describe("and a query string is invalid", function() {
            beforeEach(function() {  
                var invalidNameQuery =  { name: undefined };
                var fakeRequest = testUtil.createFakeRequest(null, invalidNameQuery);           

                validateParams(fakeRequest, responseSpy, handlerMethodDefinition);
            });

            it('should set response as 400 and populate body with reason', function() {
                var expectedBody = { 
                    message: "The value must be populated.",
                    property: "name"
                };
                
                shouldCorrectlyFailValidation(responseSpy, expectedBody);
            });
        });

       describe("and a params value is invalid", function() {
            beforeEach(function() {  
                var invalidIdParams =  { id: "bob" };
                var fakeRequest = testUtil.createFakeRequest(invalidIdParams);           

                validateParams(fakeRequest, responseSpy, handlerMethodDefinition);
            });

             it('should set response as 400 and populate body with reason', function() {
                var expectedBody = { 
                    message: "The value must be numeric.",
                    property: "id"
                };
                
                shouldCorrectlyFailValidation(responseSpy, expectedBody);
            });
        });

        function shouldCorrectlyFailValidation(responseSpy, expectedBody) {
            assert.equal(responseSpy.spiedStatus, 400);   
            assert.deepEqual(responseSpy.spiedBody, expectedBody);
        }
    });
});