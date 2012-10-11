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
        'should get told it can be' : resultEquals(true)
    },

    'when you ask if "GET" can be handled': {
        topic: HttpMethod.canHandle("GET"),
        'should get told it can be' : resultEquals(true)
    },

    'when you ask if "put" can be handled': {
        topic: HttpMethod.canHandle("put"),
        'should get told it can be' : resultEquals(true)
    },

    'when you ask if "post" can be handled': {
        topic: HttpMethod.canHandle("post"),
        'should get told it can be' : resultEquals(true)
    },

    'when you ask if "delete" can be handled': {
        topic: HttpMethod.canHandle("delete"),
        'should get told it can be' : resultEquals(true)
    },

    'when you ask if "foo" can be handled': {
        topic: HttpMethod.canHandle("foo"),
        'should get told it can be' : resultEquals(false)
    },

    'when you ask if "head" can be handled': {
        topic: HttpMethod.canHandle("head"),
        'should get told it can be' : resultEquals(false)
    }
}).export(module);