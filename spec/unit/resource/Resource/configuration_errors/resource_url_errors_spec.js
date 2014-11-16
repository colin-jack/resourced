var fixture = require('./../../../unitTestFixture');
var assert = fixture.assert;
var Resource = fixture.resourced.Resource;

describe('configuration errors - url: ', function () {
    var createWithUrl = function (url) {
        new Resource({
            url: url,
            respondsTo: []
        });
    }
    
    var ExpectedError = "Please provide a URL as part of your resource definition.";
    
    describe('when the resource URL is undefined', function () {
        it('should get an error', function () {
            assert.throws(function () { createWithUrl(undefined) }, ExpectedError);
        });
    });
    
    describe('when the resource URL is an object', function () {
        it('should get an error', function () {
            assert.throws(function () { createWithUrl({ "url": "foo.com" }) }, ExpectedError);
        });
    });
    
    describe('when the resource URL is missing', function () {
        it('should get an error', function () {
            assert.throws(function () { new Resource({}) }, ExpectedError);
        });
    });
});