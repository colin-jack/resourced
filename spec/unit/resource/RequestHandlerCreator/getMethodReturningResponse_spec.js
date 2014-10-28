var assert = require('chai').assert;
var resourced = require('require-namespace').resourced;
var sinon = require('sinon');
var getHandlerMethodDefinitionObjectMother = testLib.getHandlerMethodDefinitionObjectMother;
var createRequestHandler = resourced.RequestHandlerCreator.create;

describe('handling GET request', function () {
    var responseSendSpy;
    var response;
    var fakeResponse;

    beforeEach(function () {
        fakeResponse = {
            send: function () { },
            render: function () { }
        };
        
        response = {};

        responseSendSpy = sinon.spy(fakeResponse, "send");
        responseRenderSpy = sinon.spy(fakeResponse, "render");
    });


    describe('when you return an object from a GET handler method and do not otherwise set response body', function() {
        beforeEach(function () {  
            debugger;
            var handlerMethodDefinition = getHandlerMethodDefinitionObjectMother.createReturning(response);

            wrapAndCallHandlerDefinition(handlerMethodDefinition);
        });

        it('should use the returned object as response body', function () {
            assert.isTrue(responseSendSpy.calledOnce);
            assert.equal(response, responseSendSpy.firstCall.args[0]);
        });

        it('should not call render method', function () {
            assert.isFalse(responseRenderSpy.called);
        });
    });
    
    describe('when you set response body explicitly', function () {
        beforeEach(function () {
            var handlerMethodDefinition = getHandlerMethodDefinitionObjectMother.createExplicitlyRendering(response);
            
            wrapAndCallHandlerDefinition(handlerMethodDefinition);
        });
        
        it('should ignore any returned value', function () {
            assert.isFalse(responseSendSpy.called);
        });
    });


    function wrapAndCallHandlerDefinition(handlerMethodDefinition) {
        var fakeResourceDefinition = {};
        
        var wrapped = createRequestHandler("get", handlerMethodDefinition, "get", fakeResourceDefinition);
        
        wrapped({}, fakeResponse);
    }
});