var fixture = require('./../../unitTestFixture')
var underTest = fixture.resourced.require('validateUrl');

var mustBe = require('rules').mustBe;

var assert = fixture.assert;
var testUtil = fixture.testLib.testUtil;

var handlerDefinitionObjectMother = require('./handlerDefinitionObjectMother');
var validationTestUtil = require('./validationTestUtil');

describe('invalid URL', function() {
    describe("when url schema is applied at resource level", function() {
        var fakeResponse, returned, fakeRequest, resourceWithSchemaDefinition;

        beforeEach(function() {  
            fakeRequest = testUtil.createFakeRequest();           
            fakeRequest.query = { name: undefined }

            resourceWithSchemaDefinition = {
                urlSchema: { 
                    name: mustBe().numeric().populated()
                }
            }

            fakeResponse = testUtil.createFakeResponse();
        });

        describe("and a query string is invalid", function() {
            beforeEach(function() {  
                var noRulesMethodDefinition = handlerDefinitionObjectMother.createWithNoRules();
                
                returned = performValidation(noRulesMethodDefinition);
            });

            it('should set response as 400 and populate body with reason', function() {
                var expectedBody = { 
                    message: "The value must be populated.",
                    property: "name"
                };
                
                validationTestUtil.shouldCorrectlyFailValidation(fakeResponse, expectedBody, returned);
            });
        });

        describe("but its over-ridden at method level to make requests valid", function() {
            beforeEach(function() {  
                var overridingSoAllValidMethodDefinition = handlerDefinitionObjectMother.createWithNoRules();
                overridingSoAllValidMethodDefinition.urlSchema = {}

                returned = performValidation(overridingSoAllValidMethodDefinition);
            });

            it('should pass validation', function() {
                assert.isUndefined(fakeResponse.spiedStatus);   
                assert.isUndefined(fakeResponse.spiedBody);
                assert.isTrue(returned, "The validation method should have returned true.")
            });
        });

        var performValidation = function (methodDefinition) {
            var context = {
                request: fakeRequest, 
                response: fakeResponse
            };

            return underTest(context, methodDefinition, resourceWithSchemaDefinition);
        }
    });
});