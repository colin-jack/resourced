var request = require('testresources'), 
    express = require('express'),
    testUtil = require('./testUtil');

describe('when you send put request to simple resource which validates the body', function(){
    beforeEach(require('./registerTestResources'))

    it('should work correctly if body is OK', function(done) {
        var body = { name: "spot", id: 5 };

        request(app).put('/puppies/5', body)
            .run(done);
    })

    it('should raise appropriate error if body is invalid', function(done) {
        var requestBody = {
            name: "too short",
            cell: true
        }

        var expectedResponseBody = { 
            message: 'The request body was not valid.',
            details: { 
                name: { 
                    message: 'The length cannot be less than 50.',
                    type: 'outside_length_constraint',
                    value: 'too short' 
                },
                cell: { 
                    message: 'The value must be a string.',
                    type: 'not_a_string',
                    value: true 
                } 
            }   
        };

        request(app).put('/puppies/5', requestBody)
            .expectBody(expectedResponseBody)
            .expectStatus(400)
            .run(done); 
    })

    it('should raise appropriate error if body is missing', function(done) {
        var expectedResponseBody = {
            message: "The request body was not valid.",
            details: {
               name: { message: 'The value must be populated.',
                       type: 'not_populated' }
            }
        };

        request(app).put('/puppies/5', null)
            .expectBody(expectedResponseBody)
            .expectStatus(400)
            .run(done); 
    })
})