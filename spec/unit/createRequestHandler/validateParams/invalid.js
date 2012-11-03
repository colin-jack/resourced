var assert = require('chai').assert,
    fixture = require('./../../testFixture'),
    testUtil = require('./../testUtil'),
    responseTestUtil = require('./../responseTestUtil'),
    argumentValidationTestUtil = require('./argumentValidationTestUtil'),
    validateParams = fixture.require('validateParams');

describe('handling request - validating parameters', function() {
    describe("When the parameters are invalid", function() {
        var responseSpy;

        beforeEach(function() {  
            var invalidParams = { id: "bob" };

            responseSpy = responseTestUtil.createResponseSpy();
            var handlerMethodDefinition = argumentValidationTestUtil.createHandlerDefinitionWithRules();
            var fakeRequest = testUtil.createFakeRequest(invalidParams);           

            validateParams(fakeRequest, responseSpy, handlerMethodDefinition);
        });

        it('should set response as 400', function() {
            assert.equal(responseSpy.spiedStatus, 400);
        });

        it('should put description of issue in body', function() {
            assert.equal(responseSpy.spiedStatus, 400);
        });
    });

    // TODO: No body argument but request body invalid
    // TODO: Body included and invalid
    // TODO: Body included and previous argument undefined
});