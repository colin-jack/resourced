var vows = require('vows'),
    assert = require('assert'),
    httpMethodSpecificBehavior = require('./../testFixture').require('httpMethodSpecificBehavior');

var getHttpMethodSpecificBehavior = function(httpMethod) {  
    return httpMethodSpecificBehavior.forHttpMethod(httpMethod);
};

var shouldNotArgumentHandlerArguments = function() {
    return function(err, underTest) {
        var methodArguments = [];
        var fakeRequest = { body: 5};
        
        underTest.augmentHandlerArguments(methodArguments, fakeRequest);
        
        assert.equal(methodArguments.length, 0);
    }
};

var shouldArgumentHandlerArguments = function() {
    return function(err, underTest) {
        var methodArguments = [];
        var fakeRequest = { body: 5};
        
        underTest.augmentHandlerArguments(methodArguments, fakeRequest);
        
        assert.equal(methodArguments.length, 1);
        assert.equal(methodArguments.pop(), fakeRequest.body);
    }
};

vows.describe('http method specific behavior').addBatch({
    'when you use behavior for a get request': {
        topic: getHttpMethodSpecificBehavior("get"),

        'should not augment the handler arguments' : shouldNotArgumentHandlerArguments(),
    },

    'when you use behavior for a delete request': {
        topic: getHttpMethodSpecificBehavior("delete"),

        'should not augment the handler arguments' : shouldNotArgumentHandlerArguments(),
    },

    'when you use behavior for a put request': {
        topic: getHttpMethodSpecificBehavior("put"),

        'should not augment the handler arguments' : shouldArgumentHandlerArguments(),
    },

    'when you use behavior for a post request': {
        topic: getHttpMethodSpecificBehavior("post"),

        'should not augment the handler arguments' : shouldArgumentHandlerArguments(),
    }
}).export(module);