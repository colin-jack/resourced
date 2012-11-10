var assert = require('chai').assert,
    sinon = require('sinon'),
    fixture = testLib.require('testFixture'),
    testUtil = testLib.require('testUtil'),
    responseTestUtil = testLib.require('responseTestUtil'),
    handlerDefinitionObjectMother = require('./handlerDefinitionObjectMother')
    createRequestHandler = lib.require('createRequestHandler');

describe('createRequestHandler', function() {
    var fakeResponse = responseTestUtil.createResponseSpy();

    describe('when the resource has argument validation applied and an argument for a request is invalid', function() {
        var wrappedHandler, handlerMethodDefinition;

        beforeEach(function() {  
            handlerMethodDefinition = handlerDefinitionObjectMother.createWithNameIdRules();

            wrappedHandler = createRequestHandler("get", handlerMethodDefinition, "get", {});
            
            var fakeRequest = testUtil.createFakeRequest();
            fakeRequest.params = { id: "bob" };

            wrappedHandler(fakeRequest, fakeResponse);
        });

        it('should set response as 400 and not continue with handler logic', function() {
            shouldCancelResponseWithStatusCode400(fakeResponse, handlerMethodDefinition) 
        });
    });

    describe('when the resource has body validation applied and the body is invalid', function() {
        var wrappedHandler, handlerMethodDefinition;

        beforeEach(function() {  
            handlerMethodDefinition = handlerDefinitionObjectMother.createWithBodyRules();

            var fakeRequest = testUtil.createFakeRequest();
            fakeRequest.body = {
                status: null, 
                age: "bob"
            }

            createAndCallHandler(handlerMethodDefinition, fakeRequest, fakeResponse);
        });

        it('should set response as 400 and not continue with handler logic', function() {
            shouldCancelResponseWithStatusCode400(fakeResponse, handlerMethodDefinition) 
        });
    });

    describe('when the resource has body validation applied and the body as well as a parameter are invalid', function() {
        var wrappedHandler, handlerMethodDefinition;

        beforeEach(function() {  
            handlerMethodDefinition = handlerDefinitionObjectMother.createWithIdBodyRules();

            var fakeRequest = testUtil.createFakeRequest();
            fakeRequest.body = {
                status: null, 
                age: "bob"
            };
            fakeRequest.params = { id: "bob" };

            createAndCallHandler(handlerMethodDefinition, fakeRequest, fakeResponse);
        });

        it('should set response as 400 and not continue with handler logic', function() {
            shouldCancelResponseWithStatusCode400(fakeResponse, handlerMethodDefinition) 
        });

        it('should base the response message on the invalid parameter', function() {
            var expectedBody = { 
                message: "The value must be numeric.",
                property: "id"
            };

            assert.deepEqual(fakeResponse.spiedBody, expectedBody, "Expected: " + require('util').inspect(expectedBody) +  "Actual: " + require('util').inspect(fakeResponse.spiedBody));
        });
    });

    describe('when the resource has body validation applied and the body is empty', function() {
        var wrappedHandler, handlerMethodDefinition;

        beforeEach(function() {  
            handlerMethodDefinition = handlerDefinitionObjectMother.createWithBodyRules();

            var fakeRequest = testUtil.createFakeRequest();
            fakeRequest.body = null;

            createAndCallHandler(handlerMethodDefinition, fakeRequest, fakeResponse);
        });

        it('should set response as 400 and not continue with handler logic', function() {
            shouldCancelResponseWithStatusCode400(fakeResponse, handlerMethodDefinition) 
        });
    });

    function createAndCallHandler(handlerMethodDefinition, fakeRequest, fakeResponse) {
        var wrappedHandler = createRequestHandler("get", handlerMethodDefinition, "get", {});

        wrappedHandler(fakeRequest, fakeResponse);
    }

    function shouldCancelResponseWithStatusCode400(fakeResponse, handlerMethodDefinition) {
        assert.equal(fakeResponse.spiedStatus, 400, "Status should be 400");
        assert.isFalse(handlerMethodDefinition.handlerWasCalled(), "Since the validation failed the handler method should not have been called.");
    }
});