var assert = require('chai').assert,
    sinon = require('sinon'),
    fixture = require('./../testFixture'),
    mustBe = require('rules').mustBe,
    testUtil = require('./testUtil'),
    createWrappedHandlerMethod = fixture.require('createWrappedHandlerMethod');

describe('wrapped handler method - validating arguments', function() {
    var wrappedHandler;

    beforeEach(function() {  
        var handlerDefinition = {
            get: function(id) {
            },
            arguments: {
                id: mustBe().numeric()
            }
        };

        wrappedHandler = createWrappedHandlerMethod("get", handlerDefinition, "get", {});
    });

    describe('when the method has argument validation applied', function() {
        var fakeResponse;

        beforeEach(function() {  
            fakeResponse = testUtil.createResponseSpy();
            
            var invalidParams = { id: "bob" };
            var fakeRequest = testUtil.createFakeRequest(invalidParams);

            wrappedHandler(fakeRequest, fakeResponse);
        });

        it('should set response as 400 if the passed in argument value is not suitable', function() {
            assert.equal(fakeResponse.setStatus, 400);
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