var vows = require('vows'),
	assert = require('assert'),
    resourceObjectMother = require('./util/resourceObjectMother'),
    expressConfigurationSpy = require('./util/expressConfigurationSpy');

vows.describe('simple get only resource').addBatch({
    'when specifying a resource with get method': {
        
        topic: function () {  
            var underTest = resourceObjectMother.createGetOnlyResource();

            debugger;

            var spy = expressConfigurationSpy("get");
            spy.configureExpressUsing(underTest);
            return spy;
        },

        'should not get an error' : function(returned) {
            assert.isFalse(returned instanceof Error, returned.toString());
        },

        'should notify express of the new GET method' : function(expressSpy) {
            debugger;
            expressSpy.assertCalledOnce();
        },

        'should use correct URL when configuring express': function(expressSpy) {
            expressSpy.assertUrlRegisteredWithIs("/things/:third/:first/:second");
        },

        'and then simulating a request getting to the associated handler method' : {
            topic: function(expressSpy) {
                //var handlerMethod = expressSpy.firstCall.args[ExpressConfigArgumntIndexes.HandlerMethod];
                //handlerMethod();
            },

                    // 'should pass all provided request parameters to handler': function (expressSpy) {
        //     //  resourceUrl, boundRequestHandler
        //     expressSpy.firstCall.withArgs()
        // },
        // 'should pass undefined for all missing request parameters': function (expressSpy) {
        //     //assert.equal(42, 42);
        // },
        }
    }
}).export(module);