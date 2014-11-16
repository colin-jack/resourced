var fixture = require('./../../../unitTestFixture');
var assert = fixture.assert;
var Resource = fixture.resourced.Resource;

describe('errors specifying resource', function() {
    describe('when you omit the URL when defining a resource', function() {
        it('should get an error', function() {
            var createResource = function() {
                new Resource({
                    respondsTo: [
                        {
                            get: function() {}
                        }
                    ]
                });
            }

            assert.throws(createResource, Error);
        });
    });

    describe('when a handler methods http verb cannot be ascertained', function() {
        it('should get an error', function() {
            var createResource = function() {
                return new Resource({
                    url : "foo/:id",
                    respondsTo: [
                        {
                            foo: function() {}
                        }
                    ]
                });
            };

            assert.throws(createResource, Error);
        });
    });
    
    
    // not a generator

    describe.skip('when the resource URL is an absolute URL', function () { });
    describe.skip('when the resource cache value is not a caching definition object', function () { });
    describe.skip('when you have multiple methods using same HTTP verb', function () { });
    describe.skip('when the url ends with a /', function () { });
});