var assert = require('chai').assert,
    getHttpMethodToUseForHandler = require('./../testFixture').require('getHttpMethodToUseForHandler');

var getHttpMethodWhenOverriddenAtHandlerLevel = function(handlerMethodName, httpMethod) {  
    var handlerObject = {
       httpMethod: httpMethod
    };

    return getHttpMethodToUseForHandler(handlerObject, handlerMethodName);
};

var correctHttpMethodApplied = function(result, expected) {
    assert.equal(result, expected);
};

var getHttpMethodForHandlerNoOverride = function(handlerMethodName) {
    return getHttpMethodToUseForHandler({}, handlerMethodName);
}

describe('working out http method for a handler method', function() {
    describe('when you ask for the http method for a method named GET but it has verb overloaded to be put', function() {
        it('should get overriden value', function() {
            var httpMethod = getHttpMethodWhenOverriddenAtHandlerLevel("get", "put");
            correctHttpMethodApplied(httpMethod, "put")
        });
    });

    describe('when you ask for the http method for a method named put but it has verb overloaded to be post', function() {
        it('should get overriden value', function() {
            var httpMethod = getHttpMethodWhenOverriddenAtHandlerLevel("put", "post");
            correctHttpMethodApplied(httpMethod, "post")
        });
    });

    describe('when you ask for the http method for a method named put and there is no overload', function() {
        it('should get overriden value', function() {
            var httpMethod = getHttpMethodForHandlerNoOverride("put");
            correctHttpMethodApplied(httpMethod, "put")
        });
    });

    describe('when you ask for the http method for a method named delete and there is no overload', function() {
        it('should work out value based on method name', function() {
            var httpMethod = getHttpMethodForHandlerNoOverride("delete");
            correctHttpMethodApplied(httpMethod, "delete")
        });
    });

    describe('when you ask for the http method for a method named post and there is no overload', function() {
        it('should work out value based on method name', function() {
            var httpMethod = getHttpMethodForHandlerNoOverride("post");
            correctHttpMethodApplied(httpMethod, "post")
        });
    });

    describe('when you ask for the http method for a method named foo but it has verb overloaded to be post', function() {
        it('should work out value based on method name', function() {
            var httpMethod = getHttpMethodWhenOverriddenAtHandlerLevel("foo", "post");
            correctHttpMethodApplied(httpMethod, "post")
        });
    });

    describe('when you ask for the http method for a method named foo and there is no overload', function() {
        it('should get an error', function() {
            assert.throws(function() { getHttpMethodToUseForHandler({}, "foo") }, Error);
        });
    });   
});