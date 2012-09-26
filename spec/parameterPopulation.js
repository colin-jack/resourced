var vows = require('vows'),
	assert = require('assert'),
    Resource = require('../Resource'),
    sinon = require('sinon');

vows.describe('require all files in directory').addBatch({
    'when specifying a resource with get method': {
        topic: function () {  
            var express = {
                get: function() {}
            };

            var underTest = new Resource({
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

            var expressSpy = sinon.spy(express, "get");

            return expressSpy;
        },
        'should configure the appropriate method of express' : function(expressSpy) {
            assert.isFalse(expressSpy.calledOnce);
        },

        'should pass all provided request parameters to handler': function (expressSpy) {
            spy.firstCall.withArgs()
        },
        'should pass undefined for all missing request parameters': function (expressSpy) {
            assert.equal(42, 42);
        },
    }
}).export(module);