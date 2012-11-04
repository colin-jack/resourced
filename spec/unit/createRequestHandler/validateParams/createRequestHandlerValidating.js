var assert = require('chai').assert,
    sinon = require('sinon'),
    fixture = require('./../../testFixture'),
    testUtil = require('./../testUtil'),
    responseTestUtil = require('./../responseTestUtil'),
    handlerDefinitionObjectMother = require('./handlerDefinitionObjectMother')
    createRequestHandler = fixture.require('createRequestHandler');

describe('handling request - validating arguments', function() {
    var wrappedHandler;

    beforeEach(function() {  
        var handlerDefinition = handlerDefinitionObjectMother.createWithNameIdRules();

        wrappedHandler = createRequestHandler("get", handlerDefinition, "get", {});
    });

    describe('when the method has argument validation applied', function() {
        var fakeResponse;

        beforeEach(function() {  
            fakeResponse = responseTestUtil.createResponseSpy();
            
            var invalidParams = { id: "bob" };
            var fakeRequest = testUtil.createFakeRequest(invalidParams);

            wrappedHandler(fakeRequest, fakeResponse);
        });

        it('should set response as 400 if the passed in argument value is not suitable', function() {
            assert.equal(fakeResponse.spiedStatus, 400);
        });
    });
});