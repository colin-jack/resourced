var vows = require('vows'),
    assert = require('assert'),
    getHttpMethodToUseForHandler = require('./../testFixture').require('getHttpMethodToUseForHandler');

var getHttpMethodWhenOverriddenAtHandlerLevel = function(handlerMethodName, httpMethod) {  
    var handlerObject = {
       httpMethod: httpMethod
    };

    return getHttpMethodToUseForHandler(handlerObject, handlerMethodName);
};

var correctHttpMethodApplied = function(httpMethod) {
    return function(err, result) {
        assert.equal(result, httpMethod);
    }
};

var getHttpMethodForHandler = function(handlerMethodName) {
    return getHttpMethodToUseForHandler({}, handlerMethodName);
}

vows.describe('working out http method for a handler method').addBatch({
    'when you ask for the http method for a method named GET but it has verb overloaded to be put': {
        topic: getHttpMethodWhenOverriddenAtHandlerLevel("get", "put"),

        'should get overriden value' : correctHttpMethodApplied("put")
    },

    'when you ask for the http method for a method named put but it has verb overloaded to be post': {
        topic: getHttpMethodWhenOverriddenAtHandlerLevel("put", "post"),

        'should get overriden value' : correctHttpMethodApplied("post")
    },

    'when you ask for the http method for a method named put and there is no overload': {
        topic: getHttpMethodForHandler("put"),

        'should work out value based on method name' : correctHttpMethodApplied("put")
    },

    'when you ask for the http method for a method named delete and there is no overload': {
        topic: getHttpMethodForHandler("delete"),

        'should work out value based on method name' : correctHttpMethodApplied("delete")
    },

    'when you ask for the http method for a method named post and there is no overload': {
        topic: getHttpMethodForHandler("post"),

        'should work out value based on method name' : correctHttpMethodApplied("post")
    },

    'when you ask for the http method for a method named foo but it has verb overloaded to be post': {
        topic: getHttpMethodWhenOverriddenAtHandlerLevel("foo", "post"),

        'should get overriden value' : correctHttpMethodApplied("post")
    },

    'when you ask for the http method for a method named foo and there is no overload': {
        topic: function() {
            return getHttpMethodToUseForHandler({}, "foo");
        },

        'should get an error' : function(err) {
            assert.instanceOf(err, Error);
        }
    },    
}).export(module);