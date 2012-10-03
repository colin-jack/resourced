var vows = require('vows'),
    assert = require('assert'),
    uriCreator = require('./../underTestNamespace').require('uriCreator');

vows.describe('generating simple uri').addBatch({
    'when you generate a simple url': {
        topic: function () {           
            var stubResource = {
                resourceUrl: "/:id/:idTwo/:somethingElse?idThree=:idThree&idFour=:idFour&id=:id"
            };

            var parameters = { id: 1, idTwo: 4, somethingElse: 2, idThree: 3, idFour: 4};

            return uriCreator.createUri(stubResource, parameters);
        },

        'should get expected url' : function(url) {
            assert.equal(url, "/1/4/2?idThree=3&idFour=4&id=1");
        }
    },

    'when you generate a simple url but miss optional parameters': {
        topic: function () {           
            var stubResource = {
                resourceUrl: "/:id/:somethingElse/:anotherThing"
            };

            var parameters = { id: 1, somethingElse: 2};

            return uriCreator.createUri(stubResource, parameters);
        },

        'should get url with tokens still included' : function(url) {
            assert.equal(url, "/1/2/:anotherThing");
        }
    }
}).export(module);