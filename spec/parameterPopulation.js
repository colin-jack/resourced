var vows = require('vows'),
	assert = require('assert'),
    Resource = require('../Resource'),
    sinon = require('sinon');

var createGetOnlyResource = function() {
    return new Resource({
        url: "/things/:third/:first/:second",
        
        cache: {
            years : 10,
            where : "private"
        },

        respondsTo: 
        [
            {
                get: function(third, second, first) {
                }
            }
        ]
    });
};

vows.describe('simple get only resource').addBatch({
    'when specifying a resource with get method': {
        
        topic: function () {  
            var express = {
                get: function() {}
            };

            var underTest = createGetOnlyResource();

            var expressGetMethodSpy = sinon.spy(express, "get");

            underTest.configureExpress(express);

            return expressGetMethodSpy;
        },
        'should not get an error' : function(response) {
            assert.isFalse(response instanceof Error, response.toString());
        },

        'should notify express of the new GET method' : function(expressGetMethodSpy) {
            assert.isTrue(expressGetMethodSpy.calledOnce);
        },

        'should use correct URL when configuring express': function(expressGetMethodSpy) {
            assert.equal(expressGetMethodSpy.firstCall.args[0], "/things/:third/:first/:second");
        },

        'and then simulating a request getting to the associated handler method' : {
            topic: function(expressGetMethodSpy) {
                console.log("ok");
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