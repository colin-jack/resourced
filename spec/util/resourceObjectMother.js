var underTestNamespace = require('./../underTestNamespace');
var Resource = underTestNamespace.require('Resource');

var createGetOnlyResource = function() {
    return new Resource({
        url: "/things/:third/:first/:second",
        
        // cache: {
        //     years : 10,
        //     where : "private"
        // },

        respondsTo: 
        [
            {
                get: function(third, second, first) {
                }
            }
        ]
    });
};

// Resource with a get method that spies on calls to that method.
var createGetOnlyResourceSpy = function() {
    var argumentsPassedToGetMethod = [];

    var resource = new Resource({
        url: "/things/:third/:first/:second",

        argumentsPassedToGetMethod : [],

        respondsTo: [
            {
                get: function(third, second, first) {
                    argumentsPassedToGetMethod.push(third);
                    argumentsPassedToGetMethod.push(second);
                    argumentsPassedToGetMethod.push(first);
                }
            }
        ],
    });

    // Used to return record of arguments passed to get method, making spying simple.
    resource.getArgumentsPassedToGetMethod = function() {
        return argumentsPassedToGetMethod;
    }

    return resource;
};

module.exports = {
    createGetOnlyResource : createGetOnlyResource,
    createGetOnlyResourceSpy : createGetOnlyResourceSpy
};