var fixture = require('./../../testFixture'),
    testUtil = require('./../testUtil'),
    responseTestUtil = require('./../responseTestUtil'),
    handlerDefinitionObjectMother = require('./handlerDefinitionObjectMother'),
    validationTestUtil = require('./validationTestUtil'),
    underTest = fixture.require('validateBody');

describe('validateBody', function() {
    describe("When the request body is validated", function() {
        var responseSpy, handlerDefinition, returned;

        beforeEach(function() {  
            responseSpy = responseTestUtil.createResponseSpy();
        });

  

        // describe("and it is invalid", function() {
        //     var returned;

        //     beforeEach(function() {  
        //         var fakeRequest = testUtil.createFakeRequest();           
        //         fakeRequest.body = createInvalidRequestBody();

        //         fakeRequest.params = {id: 5};

        //         var handlerDefinition = handlerDefinitionObjectMother.createWithIdBodyRules();

        //         returned = underTest(fakeRequest, responseSpy, handlerDefinition);
        //     });

        //     it('should fail because of invalid query string', function() {
                    // var expectedBody = { 
                    //     message: "The request body was not valid.",
                    //     details: {
                    //         status: { 
                    //             message: 'The value must be a string.',
                    //             type: 'not_a_string',
                    //             value: 5 },
                    //         age: { 
                    //             message: 'The value must be populated.',
                    //             type: 'not_populated',
                    //             value: null 
                    //         } 
                    //     }
                    // }
                
        //         validationTestUtil.shouldCorrectlyFailValidation(responseSpy, expectedBody, returned);
        //     });
        // });

        function createInvalidRequestBody() {
            return {
                status: 5,
                age: null
            };
        };
    });

    // TODO: Body included and previous argument undefined
});