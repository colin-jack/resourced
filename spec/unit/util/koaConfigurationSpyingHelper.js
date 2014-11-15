var assert = require('chai').assert;
var sinon = require('sinon');

var ConfigArgumentIndexes = {
    Url: 0,
    Middleware: 1,
    HandlerMethod: 2
};

// Acts as a stub for express so you can use the resource functionality to configure it, spying on what's
// going on as appopriate. Also provides support for triggering the wrappd handler method so you can see what
// method was registered with express.
var createSpy = function(methodToSpyOn) {
    var stubKoa = {};
    stubKoa[methodToSpyOn] = function() {};

    var koaSpy = sinon.spy(stubKoa, methodToSpyOn);

    var assertCalledOnce = function() {
        assert.isTrue(koaSpy.calledOnce);
    };

    var assertUrlRegistered = function(url) {
        assert.equal(koaSpy.firstCall.args[ConfigArgumentIndexes.Url], url);
    };

    // Gets the method that was registered with express and invokes it.
    var triggerWrappedHandlerMethod = function(stubRequest, params) {
        var wrapped = koaSpy.firstCall.args[ConfigArgumentIndexes.HandlerMethod];
        
        var fakeResponse = { 
            body: null,
            set: function(header, value) {}
        };
        
        var context = {
            request: stubRequest,
            response: fakeResponse,
            params: params
        }
        
        wrapped.call(context).next();
    };

    return {
        assertCalledOnce : assertCalledOnce,
        assertUrlRegistered : assertUrlRegistered, 
        stubKoa : stubKoa,
        triggerWrappedHandlerMethod : triggerWrappedHandlerMethod
    }
};

module.exports = createSpy; 