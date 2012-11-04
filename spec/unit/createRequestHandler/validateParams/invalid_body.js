// var fixture = require('./../../testFixture'),
//     testUtil = require('./../testUtil'),
//     responseTestUtil = require('./../responseTestUtil'),
//     handlerDefinitionObjectMother = require('./handlerDefinitionObjectMother'),
//     validateParams = fixture.require('validateParams');

// describe('handling request - validating body', function() {
//     describe("When argument validation is applied to the body", function() {
//         var responseSpy, handlerMethodDefinition;

//         beforeEach(function() {  
//             responseSpy = responseTestUtil.createResponseSpy();
//             handlerMethodDefinition = handlerDefinitionObjectMother.createWithNameIdRules();
//         });

//         describe("and a query string is invalid", function() {
//             beforeEach(function() {  
//                 var invalidNameQuery =  { name: undefined };
//                 var fakeRequest = testUtil.createFakeRequest(null, invalidNameQuery);           

//                 validateParams(fakeRequest, responseSpy, handlerMethodDefinition);
//             });

//             it('should set response as 400 and populate body with reason', function() {
//                 var expectedBody = { 
//                     message: "The value must be populated.",
//                     property: "name"
//                 };
                
//                 shouldCorrectlyFailValidation(responseSpy, expectedBody);
//             });
//         });
//         function shouldCorrectlyFailValidation(responseSpy, expectedBody) {
//             assert.equal(responseSpy.spiedStatus, 400);   
//             assert.deepEqual(responseSpy.spiedBody, expectedBody);
//         }
//     });

//     // TODO: No body argument but request body invalid
//     // TODO: Body included and invalid
//     // TODO: Body included and previous argument undefined
// });