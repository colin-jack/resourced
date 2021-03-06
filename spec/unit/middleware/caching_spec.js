var fixture = require('./../unitTestFixture');
var assert = fixture.assert;
var sinon = require('sinon')
var getResponseCachingMiddleware = fixture.resourced.require('getResponseCachingMiddleware')
var cache = fixture.resourced.require('cache');

var Q = require('q');

describe('cache definitions', function () {
    describe('when you say a resource can be cached publically for two days and make a POST request', function () {
        it('should not get any response caching middleware', function () {
            var responseHeaderSpy = createCachingMiddleware(cache.days(2).publically(), "post");
            assertNoCachingMiddlewareCreated(responseHeaderSpy);
        });
    });
    
    describe('when you say a resource can be cached publically for two days and make a DELETE request', function () {
        it('should not get any response caching middleware', function () {
            var responseHeaderSpy = createCachingMiddleware(cache.days(2).publically(), "delete");
            assertNoCachingMiddlewareCreated(responseHeaderSpy);
        });
    });
    
    describe('when you say a resource can be cached publically for two days and make a PUT request', function () {
        it('should not get any response caching middleware', function () {
            var responseHeaderSpy = createCachingMiddleware(cache.days(2).publically(), "put");
            assertNoCachingMiddlewareCreated(responseHeaderSpy);
        });
    });
    
    describe('when you say a resource can be cached without specifying where and then make a GET request', function () {
        it('should default to public', function () {
            return applyCachingAndSpyOnReponseHeaderSet(cache.hours(10), "get").then(function (spy) {
                correctCacheControlValuesSet(36000, "public", spy)
            });
        });
    });
    
    describe('when you say a resource can be cached privately for five minutes and make a GET request', function () {
        it('should update response header max-age', function () {
            return applyCachingAndSpyOnReponseHeaderSet(cache.minutes(5).privately(), "get").then(function (spy) {
                correctCacheControlValuesSet(300, "private", spy)
            });
        });
    });
    
    describe('when you say a resource can be cached publically for ten days and make a GET request', function () {
        it('should update response header max-age', function () {
            return applyCachingAndSpyOnReponseHeaderSet(cache.hours(10).publically(), "get").then(function (spy) {
                correctCacheControlValuesSet(36000, "public", spy)
            });
        });
    });
    
    describe('when you say a resource can be cached publically for two days and make a GET request', function () {
        it('should update response header max-age', function () {
            return applyCachingAndSpyOnReponseHeaderSet(cache.days(2).publically(), "get").then(function (spy) {
                correctCacheControlValuesSet(172800, "public", spy);
            });
        });
    });
    
    describe('when you say a resource can be cached forever and make a GET request', function () {
        it('should update response header max-age to be ten years', function () {
            return applyCachingAndSpyOnReponseHeaderSet(cache.forever().publically(), "get").then(function (spy) {
                correctCacheControlValuesSet(315360000, "public", spy)
            });
        });
    });
    
    describe('when you specify a resource should not be cached and make a GET request', function () {
        it('should say so in cache-control header in response', function () {
            return applyCachingAndSpyOnReponseHeaderSet(cache.no(), "get").then(function (spy) {
                assert.equal(spy.firstCall.args[0], 'Cache-Control');
                assert.equal(spy.firstCall.args[1], 'no-cache');
            });
        });
        // it('should say so in pragma header in response', function(err, responseHeaderSpy) {
        //     assert.equal(responseHeaderSpy.secondCall.args[0], 'Pragma');
        //     assert.equal(responseHeaderSpy.secondCall.args[1], 'no-cache');
        // };
    });

    // describe('when the caching information exists but its a POST request' : 'NYI - Do not cache',
    // describe('when the caching information exists but its a DELETE request' : 'NYI - Do not cache',
    // describe('when the caching information has negative value for years' : 'NYI - Consider flatiron / revalidator',
    // describe('when the caching information has negative value for months' : 'NYI - Consider flatiron / revalidator',
    // describe('when the caching information has negative value for seconds' : 'NYI - Consider flatiron / revalidator',
    // describe('when the caching information is not specified' : 'NYI - No caching',
    // describe('when the caching information is specified multiple times' : 'NYI - error',
    // describe('when you override the caching definition for a specific method': 'NYI'

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

function correctCacheControlValuesSet(expectedMaxAge, location, responseHeaderSpy) {
    assert.equal(responseHeaderSpy.firstCall.args[0], 'Cache-Control');
    assert.equal(responseHeaderSpy.firstCall.args[1], 'max-age=' + expectedMaxAge + ', ' + location);
}

function applyCachingAndSpyOnReponseHeaderSet(cachingDefinition, httpMethodForRequest) {
    var underTest = createCachingMiddleware(cachingDefinition, httpMethodForRequest);
    
    var response = {
        set: function (name, value) { }
    };
    
    var responseHeaderSpy = sinon.spy(response, "set");
    
    var context = { response : response }
    
    var deferred = Q.defer();
    
    Q.spawn(function * () {       
        var next = function * () { };
        yield * underTest.call(context, next());
        
        deferred.resolve(responseHeaderSpy);
    })
    
    return deferred.promise;
}