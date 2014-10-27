var Resource = lib.require('Resource');
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

module.exports = {
    createGetOnlyResource : createGetOnlyResource
};  