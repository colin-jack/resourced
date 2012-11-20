var assert = require('chai').assert,
    httpMethodSpecificBehavior = resourcedLib.require('httpMethodSpecificBehavior');

var getHttpMethodSpecificBehavior = function(httpMethod) {  
    return httpMethodSpecificBehavior.forHttpMethod(httpMethod);
};

var shouldNotArgumentHandlerArguments = function(underTest) {
    var methodArguments = [];
    var fakeRequest = { body: 5};
    
    underTest.augmentHandlerArguments(methodArguments, fakeRequest);
    
    assert.equal(methodArguments.length, 0);
};

var shouldArgumentHandlerArguments = function(underTest) {
    var methodArguments = [];
    var fakeRequest = { body: 5};
    
    underTest.augmentHandlerArguments(methodArguments, fakeRequest);
    
    assert.equal(methodArguments.length, 1);
    assert.equal(methodArguments.pop(), fakeRequest.body);
};

describe('http method specific behavior', function() {
    describe('when you use behavior for a get request', function() {
        it('should not augment the handler arguments', 
            shouldNotArgumentHandlerArguments(getHttpMethodSpecificBehavior("get")));
    });

    describe('when you use behavior for a delete request', function() {
        it('should not augment the handler arguments', 
            shouldNotArgumentHandlerArguments(getHttpMethodSpecificBehavior("delete")));
    });

    describe('when you use behavior for a put request', function() {
        it('should not augment the handler arguments', 
            shouldArgumentHandlerArguments(getHttpMethodSpecificBehavior("put")));
    });

    describe('when you use behavior for a post request', function() {
        it('should not augment the handler arguments', 
            shouldArgumentHandlerArguments(getHttpMethodSpecificBehavior("post")));
    });
});