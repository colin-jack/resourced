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

vows.describe('require all files in directory').addBatch({
    'when specifying a resource with get method': {
        
        topic: function () {  
            var express = {
                get: function() {}
            };

            var underTest = this.createGetOnlyResource();

            var expressSpy = sinon.spy(express, "get");

            underTest.configureExpress(express);

            return expressSpy;
        },
        'should not get an error' : function(response) {
            assert.instanceOf(response, Error);
        },

        'should configure the appropriate method of express' : function(error, expressSpy) {
            assert.isTrue(expressSpy.calledOnce);
        },

        'should pass all provided request parameters to handler': function (expressSpy) {
            //  resourceUrl, boundRequestHandler
            //expressSpy.firstCall.withArgs()
        },
        'should pass undefined for all missing request parameters': function (expressSpy) {
            //assert.equal(42, 42);
        },
    }
}).export(module);