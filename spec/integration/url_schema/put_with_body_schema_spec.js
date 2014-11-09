var express = require('express');
var superAgent = require('superagent');

var resourceTest = require('testresources')
var fixture = require('./../integrationTestFixture')

var assert = fixture.assert;

describe('when you test a put request', function () {
    var server;
    var request;
    
    before(fixture.ensureSetup);

    beforeEach(function () {
        request = superAgent.put('/puppies/5')
    });
    
    it('should pass if your expectations are correct', function () {
        return resourceTest(request)
                        .expectBody({ name: 'fido' })
                        .run(fixture.server)
    });
});