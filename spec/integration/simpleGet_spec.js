var request = require('testresources'), 
    express = require('express'),
    testUtil = require('./testUtil');

describe('When you send get request to simple resource', function(){
    beforeEach(require('./registerTestResources'))

    it('should respond with expected json when URI is correct', function(done) {
        var body = { name: "spot", id: "5" };

        request(app).get('/puppies/5')
            .expectBody(body)
            .expectCached('public', 5)
            .run(done);
    })

    it('should raise appropriate error if argument does not match expectations', function(done) {
        var expectedBody = {
            property: "id",
            message: "The value must be numeric."
        };

        request(app).get('/puppies/bob')
            .expectBody(expectedBody)
            .expectStatus(400)
            .run(done);
    })
})