// var assert = require('chai').assert,
//     sinon = require('sinon'),
//     fixture = require('./../testFixture'),
//     createWrappedHandlerMethod = fixture.require('createWrappedHandlerMethod');

// describe('wrapped handler method - validating arguments', function() {
//     describe('when the method has argument validation applied to it', function() {
//         var responseSendSpy;

//         beforeEach(function() {  
//             // var fakeResponse = { send: function() {} };
//             // responseSendSpy = sinon.spy(fakeResponse, "send");

//             // var toWrap = function() {
//             //     return returnedFromWrapped;
//             // };

//             // var fakeResourceDefinition = {};

//             // var wrapped = createWrappedHandlerMethod("get", toWrap, fakeResourceDefinition);

//             // wrapped({}, fakeResponse);
//         });

//         it('should use the returned object as response body', function() {
//             // assert.isTrue(responseSendSpy.calledOnce);
//             // assert.equal(returnedFromWrapped, responseSendSpy.firstCall.args[0]);
//         });
//     });

//     // describe('when you return an object from a PUT handler method and do not otherwise set response body': 'NYI',
//     // describe('when you return an object from a GET handler method but also set response body': 'NYI',
//     // describe('when you return an object from a PUT handler method but also set response body': 'NYI',
//     // describe('when you return an object from a collection resources POST handler method and do not otherwise set response body': 'NYI',
//     // describe('when you return an object from a collection resources POST handler method but also set response body': 'NYI',
//     // describe('when you return an object from a POST handler method and do not otherwise set response body': 'NYI',
//     // describe('when you return an object from a DELETE handler method and do not otherwise set response body': 'NYI',
// });