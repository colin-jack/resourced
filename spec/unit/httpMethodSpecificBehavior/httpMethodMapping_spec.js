var assert = require('chai').assert,
    HttpMethod = lib.require('HttpMethod');

var resultEquals = function(result, expected) {
    assert.equal(result, expected);
};

describe('validating http method', function() {
    describe('when you map from "get" to http method name', function() {
        it('should map to "get"', resultEquals(HttpMethod.mapFrom("get"), "get"));
    });

    describe('when you map from "GET" to http method name', function() {
        it('should map to "get"', resultEquals(HttpMethod.mapFrom("GET"), "get"));
    });

    describe('when you map from "put" to http method name', function() {
        it('should map to "put"', resultEquals(HttpMethod.mapFrom("put"), "put"));
    });

    describe('when you map from "post" to http method name', function() {
        it('should map to "post"', resultEquals(HttpMethod.mapFrom("post"), "post"));
    });

    describe('when you map from "delete" to http method name', function() {
        it('should map to "delete"', resultEquals(HttpMethod.mapFrom("delete"), "delete"));
    });

    describe('when you map from "delete" to http method name', function() {
        it('should map to "delete"', resultEquals(HttpMethod.mapFrom("del"), "delete"));
    });

    describe('when you map from "delete" to http method name', function() {
        it('should map to "delete"', resultEquals(HttpMethod.mapFrom("destroy"), "delete"));
    });

    describe('when you map from "foo" to http method name', function() {
        it('should be undefined', resultEquals(HttpMethod.mapFrom("foo"), undefined));
    });

    describe('when you map from "head" to http method name', function() {
        it('should be undefined', resultEquals(HttpMethod.mapFrom("head"), undefined));
    });
});