var sinon = require('sinon'),
    requestResponseBuilder = testLib.require('requestResponseBuilder'),
    underTest = lib.require('createRequestHandler');

var bodyFromRequest = {
    foo: "bar"
};

describe('request handler - urlFor', function() {
    describe('when you call a request handler', function() {
        var requestContext;

        beforeEach(function() {
            requestContext = callWrappedHandlerMethodAndReturnContext("put");
        })

        it('should have a "urlFor" method on the context', function() {
            assert.isDefined(requestContext.urlFor);
        });

        it('should have two arguments to the "urlFor" function', function() {
            assert.isTrue(typeof requestContext.urlFor === 'function');
            assert.lengthOf(requestContext.urlFor, 2);
        });
    });

    function callWrappedHandlerMethodAndReturnContext() {
        var context;

        var toWrap = function() {
            context = this;
        };

        var httpMethod = "get";
        var fakeRequest = {};
        var resourceDefinition = {};
        var handlerMethodDefinition = {};
        handlerMethodDefinition[httpMethod] = toWrap;

        var wrapped = underTest(httpMethod, handlerMethodDefinition, httpMethod, resourceDefinition);
        wrapped(fakeRequest, requestResponseBuilder.createResponseSpy());

        return context;
    };

    function callWrappedHandlerAndReturnRequestBody(httpMethod) {  
        var bodyInRequestInHandler;

        var toWrap = function(id, body) {
            bodyInRequestInHandler = this.request.body;
        };

        callWrappedHandler(toWrap, httpMethod);

        return bodyInRequestInHandler;
    };
});