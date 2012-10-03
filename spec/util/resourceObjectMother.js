var underTestNamespace = require('./../underTestNamespace'),
    Resource = underTestNamespace.require('Resource');
    _u = require('underscore');

var createGetOnlyResource = function(options) {
    var defaultOptions = {
        getMethod: function() {},
        url: "/things/:third/:first/:second"
    }

    _u.extend(defaultOptions, options);

    return new Resource({
        url: defaultOptions.url,

        respondsTo: 
        [
            {
                get: defaultOptions.getMethod
            }
        ]
    });
};

// Resource with a get method that spies on calls to that method.
var createGetOnlyResourceSpy = function() {
    var argumentsPassedToGetMethod = [];

    var spyingGetMethod = function(third, second, first) {
        argumentsPassedToGetMethod.push(third);
        argumentsPassedToGetMethod.push(second);
        argumentsPassedToGetMethod.push(first);
    };

    var resource = createGetOnlyResource({ getMethod: spyingGetMethod});

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