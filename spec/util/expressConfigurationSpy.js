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

    var configureExpressUsing = function(underTest) {
        underTest.configureExpress(stubExpress);
    };

    return {
        configureExpressUsing : configureExpressUsing,
        assertCalledOnce : assertCalledOnce,
        assertUrlRegisteredWithIs : assertUrlRegisteredWithIs
    }
};

module.exports = createSpy;