var request = require('testresources'), 
    express = require('express'),
    testUtil = require('./testUtil');

describe.skip('when you send put request to simple resource which validates the body', function(){
    beforeEach(require('./registerTestResources'))

    it('should respond with expected json when URI is correct', function(done) {
        var body = { name: "spot", id: 5 };

        request(app).put('/puppies/5')
            .expectBody(body)
            .expectCached('public', 5)
            .run(testUtil.assertNoError(done));
    })

    it('should raise appropriate error if body is missing', function(done) {
        var requestBody = {
            name: "too short",
            cell: true
        }

        var expectedBody = {
            message: "The request body was not valid.",
            details: {

            }
        };

        request(app).put('/puppies/bob')
            .expectStatus(400)
            .expectBody(expectedBody)
            .run(done); // testUtil.assertError(done)
    })
})