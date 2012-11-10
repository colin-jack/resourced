var testUtil = testLib.require('testUtil'),
    responseTestUtil = testLib.require('responseTestUtil'),
    handlerDefinitionObjectMother = require('./handlerDefinitionObjectMother'),
    validationTestUtil = require('./validationTestUtil'),
    mustBe = require('rules').mustBe,
    underTest = lib.require('validateUrl');

describe('invalid URL', function() {
    describe("when url schema is applied at resource level", function() {
        var responseSpy, returned, fakeRequest, resourceWithSchemaDefinition;

        beforeEach(function() {  
            fakeRequest = testUtil.createFakeRequest();           
            fakeRequest.query = { name: undefined }

            resourceWithSchemaDefinition = {
                urlSchema: { 
                    name: mustBe().numeric().populated()
                }
            }

            responseSpy = responseTestUtil.createResponseSpy();
        });

        describe("and a query string is invalid", function() {
            beforeEach(function() {  
                var noRulesMethodDefinition = handlerDefinitionObjectMother.createWithNoRules();
                returned = underTest(fakeRequest, responseSpy, noRulesMethodDefinition, resourceWithSchemaDefinition);
            });

            it('should set response as 400 and populate body with reason', function() {
                var expectedBody = { 
                    message: "The value must be populated.",
                    property: "name"
                };
                
                validationTestUtil.shouldCorrectlyFailValidation(responseSpy, expectedBody, returned);
            });
        });

        describe("but its over-ridden at method level to make requests valid", function() {
            beforeEach(function() {  
                var overridingSoAllValidMethodDefinition = handlerDefinitionObjectMother.createWithNoRules();
                overridingSoAllValidMethodDefinition.urlSchema = {}
                returned = underTest(fakeRequest, responseSpy, overridingSoAllValidMethodDefinition, resourceWithSchemaDefinition);
            });

            it('should pass validation', function() {
                assert.isUndefined(responseSpy.spiedStatus);   
                assert.isUndefined(responseSpy.spiedBody);
                assert.isTrue(returned, "The validation method should have returned true.")
            });
        });
    });
});