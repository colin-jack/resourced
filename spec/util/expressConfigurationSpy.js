var assert = require('assert'),
    sinon = require('sinon');

var ExpressConfigArgumntIndexes = {
    Url: 0,
    HandlerMethod: 1
};

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

    var triggerWrappedHandlerMethod = function(stubRequest) {
        var wrappedHandler = expressSpy.firstCall.args[ExpressConfigArgumntIndexes.HandlerMethod];
        var fakeResponse = { send: function() {} };

        wrappedHandler(stubRequest, fakeResponse);
    };

    return {
        assertCalledOnce : assertCalledOnce,
        assertUrlRegisteredWithIs : assertUrlRegisteredWithIs, 
        stubExpress : stubExpress,
        triggerWrappedHandlerMethod : triggerWrappedHandlerMethod
    }
};

module.exports = createSpy;