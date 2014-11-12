var fixture = require('./../../unitTestFixture');
var assert = fixture.assert;
var createRequestHandler = fixture.resourced.RequestHandlerCreator.create

var sinon = require('sinon')

var bodyFromRequest = {
    foo: "bar"
};

describe('request handler', function() {
    describe('when you call a request handler associated with PUT and access request body in handler', function() {
        it('should get appropriate value', function() {
            var bodyInRequestInHandler = callWrappedHandlerAndReturnRequestBody("put");
            assert.equal(bodyInRequestInHandler, bodyFromRequest);
        });
    });

    describe('when you call a request handler associated with POST and access request body in handler', function() {
        it('should get appropriate value', function() {
            var bodyInRequestInHandler = callWrappedHandlerAndReturnRequestBody("post");
            assert.equal(bodyInRequestInHandler, bodyFromRequest);
        });
    });

    function callWrappedHandler(toWrap, httpMethod) {
        var fakeRequest = {
            params : { 
                "id" : 5
            },

            body: bodyFromRequest
        };

        var resourceDefinition = {};

        var handlerMethodDefinition = {};
        handlerMethodDefinition[httpMethod] = toWrap;

        var wrapped = createRequestHandler(httpMethod, handlerMethodDefinition, httpMethod, resourceDefinition);
        
        var fakeResponseObject = {
            send: function () { },
            render: function () { }
        };

        wrapped(fakeRequest, fakeResponseObject);
    };

    function callWrappedHandlerAndReturnBodyPassedIn(httpMethod) {
        var bodySentToHandler;

        var toWrap = function (id, body) {
            debugger;
            bodySentToHandler = body;
        };
        
        callWrappedHandler(toWrap, httpMethod);

        return bodySentToHandler;
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