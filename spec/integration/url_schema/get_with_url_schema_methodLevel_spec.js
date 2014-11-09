var resourceTest = require('testresources')
var fixture = require('./../integrationTestFixture')

var assert = fixture.assert;
var superAgent = require('superagent');

describe('when you apply a url schema at method level', function () {
    var request;
    
    before(fixture.ensureSetup);
    
    beforeEach(function () {
        request = superAgent.get('/puppies/5');
    });

    it('should respond with expected json when URI is correct', function() {
        var body = { name: "spot", id: "5" };

        return resourceTest(request)
            .expectBody(body)
            .expectCached('public', 5)
            .run(fixture.server);
    })
})

describe('when you apply a url schema at method level', function () {
    var request;
    
    before(fixture.ensureSetup);
    
    beforeEach(function () {
        request = superAgent.get('/puppies/bob');
    });
    
    it('should raise appropriate error if value in URI does not match expectations', function() {
        var expectedBody = {
            property: "id",
            message: "The value must be numeric."
        };

        return resourceTest(request)
            .expectBody(expectedBody)
            .expectStatus(400)
            .run(fixture.server);
    })
})