var request = require('testresources'), 
    express = require('express'),
    testUtil = require('./testUtil');

describe.skip('When you send get request to simple resource', function(){
    beforeEach(require('./registerTestResources'))

    it.skip('should respond with expected json when URI is correct', function(done) {
        var body = { name: "spot", id: 5 };

        request(app).get('/puppies/5')
            .expectBody(body)
            .expectCached('public', 5)
            .run(testUtil.assertNoError(done));
    })

    it.skip('should raise appropriate error if argument does not match expectations', function(done) {
        var expectedBody = {
            property: "id",
            message: "The value must be numeric."
        };

        request(app).get('/puppies/bob')
            .expectStatus(400)
            .expectBody(expectedBody)
            .run(done); // testUtil.assertError(done)
    })
})