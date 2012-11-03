// var assert = require('chai').assert,
//     fixture = require('./../testFixture'),
//     mustBe = require('rules').mustBe,
//     testUtil = require('./testUtil'),
//     validateParams = fixture.require('validateParams');

// describe('handling request - validating parameters', function() {
//     var handlerMethodDefinition;

//     beforeEach(function() {  
                

//         wrappedHandler = validateParams("get", handlerDefinition, "get", {});
//     });

//     describe('when the method has argument validation applied', function() {
//         var fakeResponse;

//         beforeEach(function() {  
//             fakeResponse = testUtil.createResponseSpy();
            
//             var invalidParams = { id: "bob" };
//             var fakeRequest = testUtil.createFakeRequest(invalidParams);

//             wrappedHandler(fakeRequest, fakeResponse);
//         });

//         it('should set response as 400 if the passed in argument value is not suitable', function() {
//             assert.equal(fakeResponse.setStatus, 400);
//         });
//     });

//     // TODO: No body argument but request body invalid
//     // TODO: Body included and invalid
//     // TODO: Body included and previous argument undefined
// });