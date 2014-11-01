var resourceTest = require('testresources');
var testUtil = require('./../testUtil');
var registerTestResources = require('./../registerTestResources');

describe('when you send PUT request to a resource and the method has body rules applied', function(){
    var fixture = {};
    
    before(registerTestResources(fixture))

    it('should work correctly if body is OK', function(done) {
        var body = { name: "spot", id: 5 };

        resourceTest(fixture.expressApp).put('/puppies/5', body)
            .run(done);
    })

    it('should raise appropriate error if body is invalid', function(done) {
        var nameUsed = "a lot of text. a lot of text. a lot of text. a lot of text. a lot of text. a lot of text. a lot of text. a lot of text. "

        var requestBody = {
            name: nameUsed,
            cell: true
        }

        var expectedResponseBody = { 
            message: 'The request body was not valid.',
            details: { 
                name: { 
                    message: 'The length cannot be greater than 50.',
                    type: 'outside_length_constraint',
                    value: nameUsed
                },
                cell: { 
                    message: 'The value must be a string.',
                    type: 'not_a_string',
                    value: true 
                } 
            }   
        };

        resourceTest(fixture.expressApp).put('/puppies/5', requestBody)
                    .expectBody(expectedResponseBody)
                    .expectStatus(400)
                    .run(done); 
    })

    it('should raise appropriate error if body is missing', function(done) {
        var expectedResponseBody = {
            message: "The request body was not valid.",
            details: {
               name: { 
                    message: 'The value must be populated.',
                    type: 'not_populated' 
                }
            }
        };

        resourceTest(fixture.expressApp).put('/puppies/5', null)
                    .expectBody(expectedResponseBody)
                    .expectStatus(400)
                    .run(done); 
    })
})