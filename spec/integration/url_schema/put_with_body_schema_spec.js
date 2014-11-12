var express = require('express');
var superAgent = require('superagent');

var resourceTest = require('testresources')
var fixture = require('./../integrationTestFixture')

describe('when you test a put request', function () {
    var request;
    
    before(fixture.ensureSetup);

    beforeEach(function () {
        var validRequestBody = {
            name: 'fido',
            cell: 'isolation'
        };
        var url = fixture.server.fullUrl('/puppies/5');

        request = superAgent.put(url).send(validRequestBody)
    });
    
    it('should pass if your expectations are correct', function () {
        return resourceTest(request)
                        .expectBody({ name: 'fido' })
                        .run(fixture.server)
    });
});

describe('when you test a put request but omit one of the required fields in the request', function () {
    var request;
    
    before(fixture.ensureSetup);

    beforeEach(function () {
        var invalidRequestBody = {
            name: "fido"
        };
        var url = fixture.server.fullUrl('/puppies/5');

        request = superAgent.put(url).send(invalidRequestBody)
    });
    
    it('should fail with suitable error', function () {
        var expectedBody = { 
            message: "The request body was not valid.",
            details: null
        }

        return resourceTest(request)
                    .expectStatus(400)
                    .expectBody(expectedBody)
                    .run(fixture.server);
    });
});

describe('when you test a put request but include numeric value for a field that should be a string', function () {
    it.skip('should fail with suitable error', function() { })
});
