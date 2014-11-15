var sinon = require('sinon');

var fixture = require('./../../unitTestFixture')
var assert = fixture.assert;
var resourceObjectMother = fixture.testLib.resourceObjectMother;
var testUtil = fixture.testLib.testUtil;
var handlerDefinitionObjectMother = require('./handlerDefinitionObjectMother');
var validationTestUtil = require('./validationTestUtil');

var createRequestHandler = fixture.resourced.RequestHandlerCreator.create;

describe('RequestHandlerCreator', function () {
    var fakeResponse = testUtil.createFakeResponse();
    
    describe('when the resource has argument validation applied and an argument for a request is invalid', function () {
        var wrappedHandler, handlerMethodDefinition;
        
        beforeEach(function () {
            handlerMethodDefinition = handlerDefinitionObjectMother.createWithNameIdRules();
            
            wrappedHandler = createRequestHandler("get", handlerMethodDefinition, "get", {});
            
            var fakeRequest = testUtil.createFakeRequest();
            
            var params = { id: "bob" };
            
            callHandler(wrappedHandler, fakeRequest, fakeResponse, params);
        });
        
        it('should set response as 400 and not continue with handler logic', function () {
            shouldCancelResponseWithStatusCode400(fakeResponse, handlerMethodDefinition)
        });
    });
    
    describe('when the resource has body validation applied and the body is invalid', function () {
        var wrappedHandler, handlerMethodDefinition;
        
        beforeEach(function () {
            handlerMethodDefinition = handlerDefinitionObjectMother.createWithBodyRules();
            
            var fakeRequest = testUtil.createFakeRequest();
            fakeRequest.body = {
                status: null, 
                age: "bob"
            }
            
            createAndCallHandler(handlerMethodDefinition, fakeRequest, fakeResponse);
        });
        
        it('should set response as 400 and not continue with handler logic', function () {
            shouldCancelResponseWithStatusCode400(fakeResponse, handlerMethodDefinition)
        });
    });
    
    describe('when the resource has body validation applied and the body as well as a parameter are invalid', function () {
        var wrappedHandler, handlerMethodDefinition;
        
        beforeEach(function () {
            handlerMethodDefinition = handlerDefinitionObjectMother.createWithIdBodyRules();
            
            var fakeRequest = testUtil.createFakeRequest();
            fakeRequest.body = {
                status: null, 
                age: "bob"
            };
            fakeRequest.params = { id: "bob" };
            
            createAndCallHandler(handlerMethodDefinition, fakeRequest, fakeResponse);
        });
        
        it('should set response as 400 and not continue with handler logic', function () {
            shouldCancelResponseWithStatusCode400(fakeResponse, handlerMethodDefinition)
        });
        
        it('should base the response message on the invalid parameter', function () {
            var expectedBody = {
                message: "The request body was not valid.",
                details: {
                    age: {
                        "message": "The value must be numeric.",
                        "type": "not_numeric",
                        "value": "bob",
                    },
                    status: {
                        "message": "The value must be populated.",
                        "type": "not_populated",
                        "value": null
                    }
                }
            };
            
            debugger;
            
            assert.deepEqual(fakeResponse.body, expectedBody, 
                            "Expected: " + require('util').inspect(expectedBody) + "Actual: " + require('util').inspect(fakeResponse.body));
        });
    });
    
    describe('when the resource has body validation applied and the body is empty', function () {
        var wrappedHandler, handlerMethodDefinition;
        
        beforeEach(function () {
            handlerMethodDefinition = handlerDefinitionObjectMother.createWithBodyRules();
            
            var fakeRequest = testUtil.createFakeRequest();
            fakeRequest.body = null;
            
            debugger;
            
            createAndCallHandler(handlerMethodDefinition, fakeRequest, fakeResponse);
        });
        
        it('should set response as 400 and not continue with handler logic', function () {
            shouldCancelResponseWithStatusCode400(fakeResponse, handlerMethodDefinition)
        });
    });
    
    function createAndCallHandler(handlerMethodDefinition, fakeRequest, fakeResponse) {
        var wrappedHandler = createRequestHandler("get", handlerMethodDefinition, "get", {});
        
        callHandler(wrappedHandler, fakeRequest, fakeResponse, {});
    }
    
    function callHandler(wrappedHandler, fakeRequest, fakeResponse, params) {
        var context = {
            request: fakeRequest,
            response: fakeResponse,
            params: params
        }
        
        wrappedHandler.call(context).next();
    }
    
    function shouldCancelResponseWithStatusCode400(fakeResponse, handlerMethodDefinition) {
        assert.equal(fakeResponse.status, 400, "Status should be 400");
        assert.isFalse(handlerMethodDefinition.handlerWasCalled(), "Since the validation failed the handler method should not have been called.");
    }
});