var sinon = require('sinon');
var Q = require('q')

var fixture = require('./../../unitTestFixture')
var assert = fixture.assert;
var linkingTestUtil = fixture.testLib.linkingTestUtil;
var getHandlerMethodDefinitionObjectMother = fixture.testLib.getHandlerMethodDefinitionObjectMother;
var createRequestHandler = fixture.resourced.RequestHandlerCreator.create;

describe('handling GET request', function () {
    var fakeResponse;

    beforeEach(function () {
        fakeResponse = {
            body: null
        };

        returnedFromHandler = {};
    });

    describe('when you return an object from a GET handler method and do not otherwise set response body', function() {
        var returnedFromHandler = {};
        beforeEach(function (done) {  

            var handlerMethodDefinition = getHandlerMethodDefinitionObjectMother.createReturning(returnedFromHandler);

            wrapAndCallHandlerDefinition(handlerMethodDefinition, done);
        });

        it('should use the returned object as response body', function () {
            assert.equal(returnedFromHandler, fakeResponse.body);
        });
    });
    
    describe('when you set response body explicitly', function (done) {
        var bodySet = {};

        beforeEach(function (done) {
            var handlerMethodDefinition = getHandlerMethodDefinitionObjectMother.createExplicitlySettingBody(bodySet);
            
            wrapAndCallHandlerDefinition(handlerMethodDefinition, done);
        });
        
        it('should ignore any returned value', function () {
            assert.equal(bodySet, fakeResponse.body);
        });
    });


    function wrapAndCallHandlerDefinition(handlerMethodDefinition, done) {
        var fakeResourceDefinition = {};
        
        var wrapped = createRequestHandler("get", handlerMethodDefinition, "get", fakeResourceDefinition);
        
        Q.spawn(function * () {
            var context = { response: fakeResponse };

            yield * wrapped.call(context);

            done();
        })
    }
});