var assert = require('chai').assert,
    resourceObjectMother = testLib.require('resourceObjectMother');

describe('generating relative link to resource', function() {
    describe('when you generate a link to a simple resource', function() {
        var link;

        beforeEach(function() {
            var resource = resourceObjectMother.createGetOnlyResource({ url: "/:id/:idTwo/:somethingElse"});
            
            link = resource.getLink("myRel", { id: 1, idTwo: 4, somethingElse: 2});
        });

        it('should not get an error', function() {
            assert.isFalse(link instanceof Error, link.toString());
        });

        it('should get expected value', function() {
            assert.equal(link.url, "/1/4/2");
            assert.equal(link.rel, "myRel");
        });
    });
});