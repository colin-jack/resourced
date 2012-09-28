var underTestNamespace = require('./../underTestNamespace');
var Resource = underTestNamespace.require('Resource');

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

module.exports = {
    createGetOnlyResource : createGetOnlyResource
};