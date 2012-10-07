var vows = require('vows'),
    assert = require('assert'),
    sinon = require('sinon'),
    fixture = require('./../testFixture'),
    getResponseCachingMiddleware = fixture.require('getResponseCachingMiddleware'),
    cache = fixture.require('cache');

vows.describe('cache definitions').addBatch({
    'when you use a five minutes privately caching definition': {
        topic: applyCachingAndSpyOnReponseHeaderSet(cache.minutes(5).privately()),

        'should update response header max-age' : corectCacheControlValuesSet(300, "private")
    },

    'when you use a ten hours publically caching definition': {
        topic: applyCachingAndSpyOnReponseHeaderSet(cache.hours(10).publically()),

        'should update response header max-age' : corectCacheControlValuesSet(36000, "public")
    },

    'when you use a two days publically caching definition': {
        topic: applyCachingAndSpyOnReponseHeaderSet(cache.days(2).publically()),

        'should update response header max-age' : corectCacheControlValuesSet(172800, "public")
    },

    'when you use a cache forever definition': {
        topic: applyCachingAndSpyOnReponseHeaderSet(cache.forever().publically()),
        'should update response header max-age to be ten years' : corectCacheControlValuesSet(315360000, "public")
    },

    'when you specify a resource should not be cached': {
        topic: applyCachingAndSpyOnReponseHeaderSet(cache.no()),
        'should say so in cache-control header in response' : function(err, responseHeaderSpy) {
            assert.equal(responseHeaderSpy.firstCall.args[0], 'Cache-Control');
            assert.equal(responseHeaderSpy.firstCall.args[1], 'no-cache');
        },
        // 'should say so in pragma header in response' : function(err, responseHeaderSpy) {
        //     assert.equal(responseHeaderSpy.secondCall.args[0], 'Pragma');
        //     assert.equal(responseHeaderSpy.secondCall.args[1], 'no-cache');
        // },
    },

    'when the caching information exists but its a POST request' : 'NYI - Do not cache',
    'when the caching information exists but its a DELETE request' : 'NYI - Do not cache',
    'when the caching information has negative value for years' : 'NYI - Consider flatiron / revalidator',
    'when the caching information has negative value for months' : 'NYI - Consider flatiron / revalidator',
    'when the caching information has negative value for seconds' : 'NYI - Consider flatiron / revalidator',
    'when the caching information is not specified' : 'NYI - No caching',
    'when the caching information is specified multiple times' : 'NYI - error',

}).export(module);

function corectCacheControlValuesSet(expectedMaxAge, location) {
    return function(err, responseHeaderSpy) {
        assert.equal(responseHeaderSpy.firstCall.args[0], 'Cache-Control');
        assert.equal(responseHeaderSpy.firstCall.args[1], 'max-age:' + expectedMaxAge + ', ' + location);
    }
};

function applyCachingAndSpyOnReponseHeaderSet(cachingDefinition) {
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