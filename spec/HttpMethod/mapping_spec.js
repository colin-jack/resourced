var vows = require('vows'),
    assert = require('assert'),
    HttpMethod = require('./../underTestNamespace').require('HttpMethod');

var resultEquals = function(expectedResponse) {
    return function(err, result) {
        assert.equal(result, expectedResponse);
    }
};

vows.describe('resource with single get method').addBatch({
    'when you map "get" to an http method': {
        topic: HttpMethod.mapFrom("get"),
        'should get expected result' : resultEquals(HttpMethod.GET)
    },

    'when you map "GET" to an http method': {
        topic: HttpMethod.mapFrom("GET"),
        'should get expected result' : resultEquals(HttpMethod.GET)
    },

    'when you map "put" to an http method': {
        topic: HttpMethod.mapFrom("put"),
        'should get expected result' : resultEquals(HttpMethod.PUT)
    },

    'when you map "post" to an http method': {
        topic: HttpMethod.mapFrom("post"),
        'should get expected result' : resultEquals(HttpMethod.POST)
    },

    'when you map "delete" to an http method': {
        topic: HttpMethod.mapFrom("delete"),
        'should get expected result' : resultEquals(HttpMethod.DELETE)
    }
}).export(module);