var fixture = require('./../../testFixture'),
    testUtil = require('./../testUtil'),
    responseTestUtil = require('./../responseTestUtil'),
    handlerDefinitionObjectMother = require('./handlerDefinitionObjectMother'),
    validationTestUtil = require('./validationTestUtil'),
    underTest = fixture.require('validateParams');

describe('handling request - body', function() {
    describe("When the request body is validated", function() {
        var responseSpy, handlerDefinition, returned;

        beforeEach(function() {  
            responseSpy = responseTestUtil.createResponseSpy();
        });

        describe("and it is invalid but a parameter string value is also invalid", function() {
            beforeEach(function() {  
                var invalidIdParams =  { id: "bob" };
                var fakeRequest = testUtil.createFakeRequest(invalidIdParams);           
                var handlerDefinition = handlerDefinitionObjectMother.createWithIdBodyRules();

                returned = underTest(fakeRequest, responseSpy, handlerDefinition);
            });

            it('should fail because of invalid query string', function() {
                var expectedBody = { 
                    message: "The value must be numeric.",
                    property: "id"
                };

                validationTestUtil.shouldCorrectlyFailValidation(responseSpy, expectedBody, returned);
            });
        });

        describe("and it is invalid", function() {
            var returned;

            beforeEach(function() {  
                var fakeRequest = testUtil.createFakeRequest();           
                
                fakeRequest.body = {
                    status: 5,
                    age: null
                };

                fakeRequest.params = {id: 5};

                var handlerDefinition = handlerDefinitionObjectMother.createWithIdBodyRules();

                returned = underTest(fakeRequest, responseSpy, handlerDefinition);
            });

            it('should fail because of invalid query string', function() {
                var expectedBody = { 
                    message: "The value must be numeric.",
                    property: "id"
                };
                
                validationTestUtil.shouldCorrectlyFailValidation(responseSpy, expectedBody, returned);
            });
        });
    });

    // TODO: Body included and previous argument undefined
});