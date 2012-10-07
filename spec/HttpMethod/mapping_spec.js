var vows = require('vows'),
    assert = require('assert'),
    HttpMethod = require('./../testFixture').require('HttpMethod');

var resultEquals = function(expectedResponse) {
    return function(err, result) {
        assert.equal(result, expectedResponse);
    }
};

vows.describe('validating http requests').addBatch({
    'when you ask if "get" can be handled': {
        topic: HttpMethod.canHandle("get"),
        'should get expected result' : resultEquals(HttpMethod.GET)
    },

    'when you ask if "GET" can be handled': {
        topic: HttpMethod.canHandle("GET"),
        'should get expected result' : resultEquals(HttpMethod.GET)
    },

    'when you ask if "put" can be handled': {
        topic: HttpMethod.canHandle("put"),
        'should get expected result' : resultEquals(HttpMethod.PUT)
    },

    'when you ask if "post" can be handled': {
        topic: HttpMethod.canHandle("post"),
        'should get expected result' : resultEquals(HttpMethod.POST)
    },

    'when you ask if "delete" can be handled': {
        topic: HttpMethod.canHandle("delete"),
        'should get expected result' : resultEquals(HttpMethod.DELETE)
    }
}).export(module);