var assert = require('chai').assert,
    Resource = resourcedLib.require('Resource');

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

    describe('when the resource URL is an absolute URL', function() {
         //'NYI - Consider flatiron / revalidator',    
         it("should raise an error");
    });

    describe('when the resource cache value is not a caching definition object', function() {
         //'NYI - Consider flatiron / revalidator',    
         it("should raise an error");
    });

    describe('when you have multiple methods using same HTTP verb without over-riding URL', function() {
         it("should raise an error");
    });
    
    describe('when the url ends with a /', function() {
         it("should log a warning");
    });
});