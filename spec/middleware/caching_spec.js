var vows = require('vows'),
    assert = require('assert'),
    sinon = require('sinon'),
    fixture = require('./../testFixture'),
    getResponseCachingMiddleware = fixture.require('getResponseCachingMiddleware'),
    cache = fixture.require('cache');

vows.describe('cache definitions').addBatch({
    'when you say a resource can be cached privately for five minutes and make a GET request': {
        topic: applyCachingAndSpyOnReponseHeaderSet(cache.minutes(5).privately(), "get"),

        'should update response header max-age' : corectCacheControlValuesSet(300, "private")
    },

    'when you say a resource can be cached publically for ten days and make a GET request': {
        topic: applyCachingAndSpyOnReponseHeaderSet(cache.hours(10).publically(), "get"),

        'should update response header max-age' : corectCacheControlValuesSet(36000, "public")
    },

    'when you say a resource can be cached publically for two days and make a GET request': {
        topic: applyCachingAndSpyOnReponseHeaderSet(cache.days(2).publically(), "get"),

        'should update response header max-age' : corectCacheControlValuesSet(172800, "public")
    },

    'when you say a resource can be cached forever and make a GET request': {
        topic: applyCachingAndSpyOnReponseHeaderSet(cache.forever().publically(), "get"),
        'should update response header max-age to be ten years' : corectCacheControlValuesSet(315360000, "public")
    },

    'when you specify a resource should not be cached and make a GET request': {
        topic: applyCachingAndSpyOnReponseHeaderSet(cache.no(), "get"),
        'should say so in cache-control header in response' : function(err, responseHeaderSpy) {
            assert.equal(responseHeaderSpy.firstCall.args[0], 'Cache-Control');
            assert.equal(responseHeaderSpy.firstCall.args[1], 'no-cache');
        },
        // 'should say so in pragma header in response' : function(err, responseHeaderSpy) {
        //     assert.equal(responseHeaderSpy.secondCall.args[0], 'Pragma');
        //     assert.equal(responseHeaderSpy.secondCall.args[1], 'no-cache');
        // },
    },

    'when you say a resource can be cached publically for two days and make a POST request': {
        topic: applyCachingAndSpyOnReponseHeaderSet(cache.days(2).publically(), "post"),

        'should not set Cache-Control header': assertCacheControlNotSet
    },

    'when you say a resource can be cached publically for two days and make a DELETE request': {
        topic: applyCachingAndSpyOnReponseHeaderSet(cache.days(2).publically(), "delete"),

        'should not set Cache-Control header': assertCacheControlNotSet
    },

    'when you say a resource can be cached publically for two days and make a PUT request': {
        topic: applyCachingAndSpyOnReponseHeaderSet(cache.days(2).publically(), "put"),

        'should not set Cache-Control header': assertCacheControlNotSet
    },

    'when the caching information exists but its a POST request' : 'NYI - Do not cache',
    'when the caching information exists but its a DELETE request' : 'NYI - Do not cache',
    'when the caching information has negative value for years' : 'NYI - Consider flatiron / revalidator',
    'when the caching information has negative value for months' : 'NYI - Consider flatiron / revalidator',
    'when the caching information has negative value for seconds' : 'NYI - Consider flatiron / revalidator',
    'when the caching information is not specified' : 'NYI - No caching',
    'when the caching information is specified multiple times' : 'NYI - error',
    'when you override the caching definition for a specific method': 'NYI'

}).export(module);

function assertCacheControlNotSet(responseHeaderSpy) {
    assert.isFalse(responseHeaderSpy.called);
};

function corectCacheControlValuesSet(expectedMaxAge, location) {
    return function(err, responseHeaderSpy) {
        assert.equal(responseHeaderSpy.firstCall.args[0], 'Cache-Control');
        assert.equal(responseHeaderSpy.firstCall.args[1], 'max-age:' + expectedMaxAge + ', ' + location);
    }
};

function applyCachingAndSpyOnReponseHeaderSet(cachingDefinition, httpMethodForRequest) {
    return function() {
        var underTest = getResponseCachingMiddleware(cachingDefinition, httpMethodForRequest);

        var response = {
            header: function(name, value) {}
        };

        var responseHeaderSpy = sinon.spy(response, "header");

        underTest({}, response, function() {});

        this.callback(null, responseHeaderSpy);
    };
}