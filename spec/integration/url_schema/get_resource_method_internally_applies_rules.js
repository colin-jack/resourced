var resourceTest = require('testresources')
var fixture = require('./../integrationTestFixture')

var superAgent = require('superagent');

describe('when you apply rules internally in the resource handler and the request does not meet them', function () {
    var request;
    
    before(fixture.ensureSetup);
    
    beforeEach(function () {
        var url = fixture.server.fullUrl('/kennel/bob');
        request = superAgent.get(url);
    });

    it('should result in a response with status of 400', function() {
        var expectedBody = { message: 'The value must be numeric.', property: 'id', type: 'not_numeric' };
        
        return resourceTest(request)
                    .expectStatus(400)
                    .expectBody(expectedBody)
                    .run(fixture.server);
    })
})

