var assert = require('chai').assert,
    HttpMethod = require('./../testFixture').require('HttpMethod');

var resultEquals = function(result, expected) {
    assert.equal(result, expected);
};

describe('validating http requests', function() {
    describe('when you ask if "get" can be handled', function() {
        it('should get told it can be', resultEquals(HttpMethod.canHandle("get"), true));
    });

    describe('when you ask if "GET" can be handled', function() {
        it('should get told it can be', resultEquals(HttpMethod.canHandle("GET"), true));
    });

    describe('when you ask if "put" can be handled', function() {
        it('should get told it can be', resultEquals(HttpMethod.canHandle("put"), true));
    });

    describe('when you ask if "post" can be handled', function() {
        it('should get told it can be', resultEquals(HttpMethod.canHandle("post"), true));
    });

    describe('when you ask if "delete" can be handled', function() {
        it('should get told it can be', resultEquals(HttpMethod.canHandle("delete"), true));
    });

    describe('when you ask if "foo" can be handled', function() {
        it('should get told it can be', resultEquals(HttpMethod.canHandle("foo"), false));
    });

    describe('when you ask if "head" can be handled', function() {
        it('should get told it can be', resultEquals(HttpMethod.canHandle("head"), false));
    });
});