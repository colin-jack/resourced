var vows = require('vows'),
    assert = require('assert'),
    sinon = require('sinon'),
    fixture = require('./../testFixture'),
    getResponseCachingMiddleware = fixture.require('getResponseCachingMiddleware'),
    CachingLocation = fixture.require('CachingLocation');

vows.describe('cache definitions').addBatch({
    'when you use a five minutes privately caching definition': {
        topic: applyCachingDefinitionAndSpyOnHeaderSet(
                {
                    minutes : 5,
                    where : CachingLocation.Private
                }),

        'should update response header max-age' : correctMaxAgeSet(300, "private")
    },

    'when you use a ten hours publically caching definition': {
        topic: applyCachingDefinitionAndSpyOnHeaderSet(
                {
                    hours : 10,
                    where : CachingLocation.Public
                }),

        'should update response header max-age' : correctMaxAgeSet(36000, "public")
    },

    'when you use a two days publically caching definition': {
        topic: applyCachingDefinitionAndSpyOnHeaderSet(
                {
                    days : 2,
                    where : CachingLocation.Public
                }),

        'should update response header max-age' : correctMaxAgeSet(172800, "public")
    },

    'when you use a cache forever definition': {
        topic: applyCachingDefinitionAndSpyOnHeaderSet(
                        {
                                forever: "scfas",
                                where : "public"
                        }),

        'should update response header max-age' : correctMaxAgeSet(172800, "public")
    },
}).export(module);

function correctMaxAgeSet(expectedMaxAge, location) {
    return function(err, responseHeaderSpy) {
        debugger;
        assert.equal(responseHeaderSpy.firstCall.args[1], 'max-age:' + expectedMaxAge + ', ' + location);
    }
};

function applyCachingDefinitionAndSpyOnHeaderSet(cachingDefinition) {
    return function() {
        var underTest = getResponseCachingMiddleware(cachingDefinition);
        var response = {
            header: function(name, value) {}
        };

        var responseHeaderSpy = sinon.spy(response, "header");

        underTest({}, response, function() {});

        this.callback(null, responseHeaderSpy);
    };
}