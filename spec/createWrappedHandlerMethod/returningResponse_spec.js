var assert = require('chai').assert,
    sinon = require('sinon'),
    fixture = require('./../testFixture');
var createWrappedHandlerMethod = fixture.require('createWrappedHandlerMethod');

var returnedFromWrapped = {
};

describe('wrapped handler method', function() {
    describe('when you return an object from a GET handler method and do not otherwise set response body' , function() {
        topic: function () {  
            var fakeResponse = { send: function() {} };
            var responseSendSpy = sinon.spy(fakeResponse, "send");

            var toWrap = function() {
                return returnedFromWrapped;
            };

            var wrapped = createWrappedHandlerMethod("get", toWrap);

            wrapped({}; fakeResponse);

            return responseSendSpy;
        };

        it('should use the returned object as response body' : function(responseSendSpy) {
            assert.isTrue(responseSendSpy.calledOnce);
            assert.equal(returnedFromWrapped, responseSendSpy.firstCall.args[0]);
        }
    };

    describe('when you return an object from a PUT handler method and do not otherwise set response body': 'NYI',
    describe('when you return an object from a GET handler method but also set response body': 'NYI',
    describe('when you return an object from a PUT handler method but also set response body': 'NYI',
    describe('when you return an object from a collection resources POST handler method and do not otherwise set response body': 'NYI',
    describe('when you return an object from a collection resources POST handler method but also set response body': 'NYI',
    describe('when you return an object from a POST handler method and do not otherwise set response body': 'NYI',
    describe('when you return an object from a DELETE handler method and do not otherwise set response body': 'NYI',
});