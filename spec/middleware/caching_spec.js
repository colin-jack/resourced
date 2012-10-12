var assert = require('chai').assert,
    sinon = require('sinon'),
    fixture = require('./../testFixture'),
    getResponseCachingMiddleware = fixture.require('getResponseCachingMiddleware'),
    cache = fixture.require('cache');

describe('cache definitions', function() {
    describe('when you say a resource can be cached privately for five minutes and make a GET request', function() {
        topic: applyCachingAndSpyOnReponseHeaderSet(cache.minutes(5).privately(), "get"),

        it('should update response header max-age' : corectCacheControlValuesSet(300, "private")
    };

    describe('when you say a resource can be cached publically for ten days and make a GET request', function() {
        topic: applyCachingAndSpyOnReponseHeaderSet(cache.hours(10).publically(), "get"),

        it('should update response header max-age' : corectCacheControlValuesSet(36000, "public")
    };

    describe('when you say a resource can be cached publically for two days and make a GET request', function() {
        topic: applyCachingAndSpyOnReponseHeaderSet(cache.days(2).publically(), "get"),

        it('should update response header max-age' : corectCacheControlValuesSet(172800, "public")
    };

    describe('when you say a resource can be cached forever and make a GET request', function() {
        topic: applyCachingAndSpyOnReponseHeaderSet(cache.forever().publically(), "get"),
        it('should update response header max-age to be ten years' : corectCacheControlValuesSet(315360000, "public")
    };

    describe('when you specify a resource should not be cached and make a GET request', function() {
        topic: applyCachingAndSpyOnReponseHeaderSet(cache.no(), "get"),
        it('should say so in cache-control header in response' : function(err, responseHeaderSpy) {
            assert.equal(responseHeaderSpy.firstCall.args[0], 'Cache-Control');
            assert.equal(responseHeaderSpy.firstCall.args[1], 'no-cache');
        };
        // it('should say so in pragma header in response' : function(err, responseHeaderSpy) {
        //     assert.equal(responseHeaderSpy.secondCall.args[0], 'Pragma');
        //     assert.equal(responseHeaderSpy.secondCall.args[1], 'no-cache');
        // };
    };

    describe('when you say a resource can be cached publically for two days and make a POST request', function() {
        topic: createCachingMiddleware(cache.days(2).publically(), "post"),

        it('should not get any response caching middleware': assertNoCachingMiddlewareCreated
    };

    describe('when you say a resource can be cached publically for two days and make a DELETE request', function() {
        topic: createCachingMiddleware(cache.days(2).publically(), "delete"),

        it('should not get any response caching middleware': assertNoCachingMiddlewareCreated
    };

    describe('when you say a resource can be cached publically for two days and make a PUT request', function() {
        topic: createCachingMiddleware(cache.days(2).publically(), "put"),

        it('should not get any response caching middleware': assertNoCachingMiddlewareCreated
    };

    describe('when the caching information exists but its a POST request' : 'NYI - Do not cache',
    describe('when the caching information exists but its a DELETE request' : 'NYI - Do not cache',
    describe('when the caching information has negative value for years' : 'NYI - Consider flatiron / revalidator',
    describe('when the caching information has negative value for months' : 'NYI - Consider flatiron / revalidator',
    describe('when the caching information has negative value for seconds' : 'NYI - Consider flatiron / revalidator',
    describe('when the caching information is not specified' : 'NYI - No caching',
    describe('when the caching information is specified multiple times' : 'NYI - error',
    describe('when you override the caching definition for a specific method': 'NYI'

});

function createCachingMiddleware(cachingDefinition, httpMethodForRequest) {
    var fakeResource = {
        cache: cachingDefinition
    };

    return getResponseCachingMiddleware(fakeResource, httpMethodForRequest);
}

function assertNoCachingMiddlewareCreated(cachingMiddleware) {
    assert.isNull(cachingMiddleware);
}

function corectCacheControlValuesSet(expectedMaxAge, location) {
    return function(err, responseHeaderSpy) {
        assert.equal(responseHeaderSpy.firstCall.args[0], 'Cache-Control');
        assert.equal(responseHeaderSpy.firstCall.args[1], 'max-age:' + expectedMaxAge + ', ' + location);
    }
}

function applyCachingAndSpyOnReponseHeaderSet(cachingDefinition, httpMethodForRequest) {
    return function() {
        var underTest = createCachingMiddleware(cachingDefinition, httpMethodForRequest);

        var response = {
            header: function(name, value) {}
        };

        var responseHeaderSpy = sinon.spy(response, "header");

        underTest({}; response, function() {});

        this.callback(null, responseHeaderSpy);
    };
}