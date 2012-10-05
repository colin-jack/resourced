var assert = require('assert'),
    sinon = require('sinon');

var ExpressConfigArgumntIndexes = {
    Url: 0,
    Middleware: 1,
    HandlerMethod: 2
};

// Acts as a stub for express so you can use the resource functionality to configure it, spying on what's
// going on as appopriate. Also provides support for triggering the wrappd handler method so you can see what
// method was registered with express.
var createSpy = function(methodToSpyOn) {
    var stubExpress = {};
    stubExpress[methodToSpyOn] = function() {};

    var expressSpy = sinon.spy(stubExpress, methodToSpyOn);

    var assertCalledOnce = function() {
        assert.isTrue(expressSpy.calledOnce);
    };

    var assertUrlRegisteredWithIs = function(url) {
        assert.equal(expressSpy.firstCall.args[ExpressConfigArgumntIndexes.Url], url);
    };

    // Gets the method that was registered with express and invokes it.
    var triggerWrappedHandlerMethod = function(stubRequest) {
        var wrappedHandler = expressSpy.firstCall.args[ExpressConfigArgumntIndexes.HandlerMethod];
        
        var fakeResponse = { 
            send: function() {},
            header: function(header, value) {}
        };

        var next = function() {};

        wrappedHandler(stubRequest, fakeResponse, next);
    };

    return {
        assertCalledOnce : assertCalledOnce,
        assertUrlRegisteredWithIs : assertUrlRegisteredWithIs, 
        stubExpress : stubExpress,
        triggerWrappedHandlerMethod : triggerWrappedHandlerMethod
    }
};

module.exports = createSpy; 