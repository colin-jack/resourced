var assert = require('chai').assert,
    Link = require('./../testFixture').require('Link');

describe('errors specifying resource', function() {
    describe('when you provide all values when creating a link', function() {
        it('should not get an error', function() {
            var link = new Link("linkRel", "foo.com");

            assert.isFalse(link instanceof Error, link.toString());
        });
    });

    describe('when you only provide rel value when creating a link', function() {
        it('should get an error', function() {
            var createLink = function() { 
                new Link("bob") 
            };
            assert.throws(createLink, Error);
        });
    });

    describe('when you only provide url value when creating a link', function() {
        it('should get an error', function() {
            var createLink = function() { 
                                new Link(undefined, "foo.com");
                              };
            assert.throws(createLink, Error);
        });
    });
});