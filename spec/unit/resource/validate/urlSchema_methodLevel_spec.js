var fixture = require('./../../unitTestFixture');

var underTest = fixture.resourced.require('validateUrl');

var assert = fixture.assert;
var testUtil = fixture.testLib.testUtil;
var responseTestUtil = fixture.testLib.responseTestUtil;

var handlerDefinitionObjectMother = require('./handlerDefinitionObjectMother');
var validationTestUtil = require('./validationTestUtil');

describe('invalid URL', function() {
    describe("When url schema is applied at method level", function() {
        var responseSpy, handlerMethodDefinition, returned;

        beforeEach(function() {  
            responseSpy = responseTestUtil.createResponseSpy();
            handlerMethodDefinition = handlerDefinitionObjectMother.createWithNameIdRules();
        });

        describe("and a query string is invalid", function() {
            beforeEach(function() {  
                var invalidNameQuery =  { name: undefined };
                var fakeRequest = testUtil.createFakeRequest(null, invalidNameQuery);           

                returned = underTest(fakeRequest, responseSpy, handlerMethodDefinition);
            });

            it('should set response as 400 and populate body with reason', function() {
                var expectedBody = { 
                    message: "The value must be populated.",
                    property: "name"
                };
                
                validationTestUtil.shouldCorrectlyFailValidation(responseSpy, expectedBody, returned);
            });
        });

       describe("and a params value is invalid", function() {
            beforeEach(function() {  
                var invalidIdParams =  { id: "bob" };
                var fakeRequest = testUtil.createFakeRequest(invalidIdParams);           

                underTest(fakeRequest, responseSpy, handlerMethodDefinition);
            });

            it('should set response as 400 and populate body with reason', function() {
                var expectedBody = { 
                    message: "The value must be numeric.",
                    property: "id"
                };
                
                validationTestUtil.shouldCorrectlyFailValidation(responseSpy, expectedBody, returned);
            });
        });
    });
});