var underTestNamespace = require('./../underTestNamespace');
var Resource = underTestNamespace.require('Resource');

var createGetOnlyResource = function() {
    var anyOldGetMethod = function() {}

    return createResourceWithGetMethod(anyOldGetMethod);
};

var createResourceWithGetMethod = function(getMethod) {
    return new Resource({
        url: "/things/:third/:first/:second",
        
        // cache: {
        //     years : 10,
        //     where : "private"
        // },

        respondsTo: 
        [
            {
                get: getMethod
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

    var resource = createResourceWithGetMethod(spyingGetMethod);

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