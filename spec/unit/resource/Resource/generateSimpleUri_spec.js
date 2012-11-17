var assert = require('chai').assert,
    resourceObjectMother = testLib.require('resourceObjectMother');

describe('generating URL to resource', function() {
    describe('when you generate a url to a simple resource', function() {
        var url;

        beforeEach(function() {
            var resource = resourceObjectMother.createGetOnlyResource({ url: "/:id/:idTwo/:somethingElse"});
            
            url = resource.getUrl({ id: 1, idTwo: 4, somethingElse: 2});
        });

        it('should not get an error', function() {
            assert.isFalse(url instanceof Error, url.toString());
        });

        it('should get expected value', function() {
            assert.equal(url, "/1/4/2");
        });
    });
});