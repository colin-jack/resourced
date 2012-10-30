var assert = require('chai').assert,
    sinon = require('sinon'),
    fixture = require('./../testFixture'),
    testUtil = require('./testUtil'),
    createWrappedHandlerMethod = fixture.require('createWrappedHandlerMethod');

describe('wrapped handler method', function() {
    describe('when you return an object from a GET handler method and do not otherwise set response body', function() {
        var responseSendSpy, 
            returnedFromWrapped = {};

        beforeEach(function() {  
            var fakeResponse = testUtil.createResponseSpy();
            responseSendSpy = sinon.spy(fakeResponse, "send");

            var handlerMethodDefinition = testUtil.createGetHandlerMethodDefinition(returnedFromWrapped);

            var fakeResourceDefinition = {};

            var wrapped = createWrappedHandlerMethod("get", handlerMethodDefinition, "get", fakeResourceDefinition);

            wrapped({}, fakeResponse);
        });

        it('should use the returned object as response body', function() {
            assert.isTrue(responseSendSpy.calledOnce);
            assert.equal(returnedFromWrapped, responseSendSpy.firstCall.args[0]);
        });
    });

    // describe('when you return an object from a PUT handler method and do not otherwise set response body': 'NYI',
    // describe('when you return an object from a GET handler method but also set response body': 'NYI',
    // describe('when you return an object from a PUT handler method but also set response body': 'NYI',
    // describe('when you return an object from a collection resources POST handler method and do not otherwise set response body': 'NYI',
    // describe('when you return an object from a collection resources POST handler method but also set response body': 'NYI',
    // describe('when you return an object from a POST handler method and do not otherwise set response body': 'NYI',
    // describe('when you return an object from a DELETE handler method and do not otherwise set response body': 'NYI',
});