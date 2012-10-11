var vows = require('vows'),
    assert = require('assert'),
    httpMethodSpecificBehavior = require('./../testFixture').require('httpMethodSpecificBehavior');

var getHttpMethodSpecificBehavior = function(httpMethod) {  
    return httpMethodSpecificBehavior.forHttpMethod(httpMethod);
};

var shouldNotArgumentHandlerArguments = function() {
    return function(err, underTest) {
        var methodArguments = []
        underTest.augmentHandlerArguments(methodArguments);
        assert.equal(methodArguments.length, 0);
    }
};

var shouldSendReturnedObjectAsResponseBody = function() {
  return function(err, underTest) {
        var returned = {};
        var sent;

        var responseSpy = {
            send : function(toSend) {
                sent = toSend;
            }
        }

        underTest.prepareResponse(returned, responseSpy);

        assert.equal(sent, returned);
    }  
}

var getHttpMethodForHandler = function(handlerMethodName) {
    return getHttpMethodToUseForHandler({}, handlerMethodName);
}

vows.describe('http method specific behavior').addBatch({
    'when you use behavior for a get request': {
        topic: getHttpMethodSpecificBehavior("get"),

        'should not augment the handler arguments' : shouldNotArgumentHandlerArguments(),

        'should send returned object as response body' : shouldSendReturnedObjectAsResponseBody()
    },


}).export(module);