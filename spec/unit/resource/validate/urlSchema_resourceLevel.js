var testUtil = testLib.require('testUtil'),
    responseTestUtil = testLib.require('responseTestUtil'),
    handlerDefinitionObjectMother = require('./handlerDefinitionObjectMother'),
    validationTestUtil = require('./validationTestUtil'),
    underTest = lib.require('validateUrl');

describe('invalid URL', function() {
    describe("when url schema is applied at resource level", function() {
        var responseSpy, noRulesHandler, returned;

        beforeEach(function() {  
            responseSpy = responseTestUtil.createResponseSpy();

            noRulesHandler = handlerDefinitionObjectMother.createWithNoRules();
        });

        describe("and a query string is invalid", function() {
            beforeEach(function() {  
                var fakeRequest = testUtil.createFakeRequest();           
                fakeRequest.query = { name: undefined }

                returned = underTest(fakeRequest, responseSpy, noRulesHandler);
            });

            it('should set response as 400 and populate body with reason', function() {
                var expectedBody = { 
                    message: "The value must be populated.",
                    property: "name"
                };
                
                validationTestUtil.shouldCorrectlyFailValidation(responseSpy, expectedBody, returned);
            });
        });
    });
});