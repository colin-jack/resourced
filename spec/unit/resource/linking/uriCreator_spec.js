var assert = require('chai').assert,
    createUrl = lib.require('createUrl'),
    linkingTestUtil = testLib.linkingTestUtil;

describe('generating simple uri', function() {

    describe('when you generate a simple url', function() {
        var url;

        beforeEach(function () {           
            var stubResource = {
                url: "/:id/:idTwo/:somethingElse?idThree=:idThree&idFour=:idFour&id=:id"
            };

            var uriParams = { id: 1, idTwo: 4, somethingElse: 2, idThree: 3, idFour: 4};

            url = createUrl(stubResource, uriParams, linkingTestUtil.fakeRequest);
        });

        it('should get expected url', function() {
            assert.equal(url, "https://foo.com:35/1/4/2?idThree=3&idFour=4&id=1");
        });
    })
    
    describe('when you generate a simple url but miss optional parameters', function() {
        var url;

        beforeEach(function () {                  
            var stubResource = {
                url: "https://foo.com:35/:id/:somethingElse/:anotherThing"
            };

            var parameters = { id: 1, somethingElse: 2};

            url = createUrl(stubResource, parameters, linkingTestUtil.fakeRequest);
        });

        it('should get url with tokens still included', function() {
        });
    })
});