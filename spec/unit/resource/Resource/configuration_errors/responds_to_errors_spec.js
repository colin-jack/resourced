var fixture = require('./../../../unitTestFixture');
var assert = fixture.assert;
var Resource = fixture.resourced.Resource;

describe('configuration errors - responds to: ', function () {
    var createWithRespondsTo = function (repondsTo) {
        new Resource({
            url: "http://google.com",
            respondsTo: repondsTo
        });
    }
    
    var NonEmptyCollectionMessage = "The responds to collection must be a non-empty array.";
    
    describe('when the responds to collection is empty', function () {
        it('should get an error', function () {
            assert.throws(function () { debugger; createWithRespondsTo([]) }, NonEmptyCollectionMessage);
        });
    });
    
    describe('when the responds to collection is null', function () {
        it('should get an error', function () {
            assert.throws(function () { createWithRespondsTo(null) }, NonEmptyCollectionMessage);
        });
    });
    
    describe('when the responds to collection has unknown method', function () {
        it('should get an error', function () {
            var func = function *() { };
            var respondsTo = [{ foo: func }];
            assert.throws(function () { createWithRespondsTo(respondsTo) }, "Could not work out what http verb to use for method foo");
        });
    });
});