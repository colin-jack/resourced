var getHttpMethodToUseForHandler = resourcedLib.require('getHttpMethodToUseForHandler');

var getHttpMethodWhenOverriddenAtHandlerLevel = function(handlerMethodName, httpMethod) {  
    var handlerObject = {
       httpMethod: httpMethod
    };

    return getHttpMethodToUseForHandler(handlerObject, handlerMethodName);
};

var getHttpMethodForHandlerNoOverride = function(handlerMethodName) {
    return getHttpMethodToUseForHandler({}, handlerMethodName);
}

describe('working out http method for a handler method - invalid overload', function() {
    describe('when you provide an invalid http method value for a method', function() {
        it('should get overriden value', function() {
            var handlerDefinition =  {
               httpMethod: "foo"
            };

            assert.throws(function() { getHttpMethodToUseForHandler(handlerDefinition, "foo") }, /The 'httpMethod' value 'foo' was invalid./)
        });
    });

    describe('when you provide an invalid http method value for a method', function() {
        it('should get overriden value', function() {
            var handlerDefinition =  {
               httpMethod: true
            };

            assert.throws(function() { getHttpMethodToUseForHandler(handlerDefinition, "foo") }, /The 'httpMethod' value 'true' was invalid./)
        });
    });
});