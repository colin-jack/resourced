var resourced = require('require-namespace').resourced;
var createUrl = resourced.require('createUrl');

var fixture = require('./../../unitTestFixture')
var assert = fixture.assert;
var resourceObjectMother = fixture.testLib.resourceObjectMother;
var linkingTestUtil = fixture.testLib.linkingTestUtil;

describe('generating URL to resource', function() {
    describe('when you generate a url to a simple resource', function() {
        var url;

        beforeEach(function() {
            var fakeRequest = linkingTestUtil.fakeRequest;

            var resource = { url: "/:id/:idTwo/:somethingElse"};
            
            url = createUrl(resource, { id: 1, idTwo: 4, somethingElse: 2}, fakeRequest);
        });

        it('should not get an error', function() {
            assert.isFalse(url instanceof Error, url.toString());
        });

        it('should get expected value', function() {
            assert.equal(url, "https://foo.com:35/1/4/2");
        });
    });
});