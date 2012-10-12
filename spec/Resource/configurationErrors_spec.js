var assert = require('chai').assert,
    Resource = require('./../testFixture').require('Resource');

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

            assert.instanceOf(createResource, Error);
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

            assert.instanceOf(createResource, Error);
        });
    });

    // describe('when the resource URL is not valid') //'NYI - Consider flatiron / revalidator, covers not starting with / or invalid characters too',
    // describe('when the resource URL is an absolute URL') //'NYI - Consider flatiron / revalidator',    
    // describe('when the resource cache value is not a caching definition object') //'NYI - Consider flatiron / revalidator',    
    // describe('when you have multiple methods using same HTTP verb') // 'NYI'
});