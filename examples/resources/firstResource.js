// TODO: Load this using require-namespace
var Resource = require('../../lib/Resource')
var winston = require('winston');

// TODO:
//   Use restrict to authenticated
//   Use url on responds to
//   Generate links (HATEOAS)
// TODO:
//   More complex routing example

module.exports = new Resource({
    url: "/things/:third/:first/:second",
    
    cache: {
        years : 10,
        where : "private"
    },

    respondsTo: 
    [
        {
            get: function(third, second, first, $logger) {
                var message = "Retrieved for values: " + first + ", " + second + ", " + third;

                this.response.send({
                    message: message
                });
            }
        }
    ]
})