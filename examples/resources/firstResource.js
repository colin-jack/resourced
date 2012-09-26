var Resource = require('../../Resource')
var winston = require('winston');


// TODO:
//   Use restrict to authenticated
//   Use url on responds to
//   Generate links (HATEOAS)


//require('namespaces')('request.middleware')
//restrictToAuthenticated = namespace('middleware').restrictToAuthenticated #require('./middleware/restrictToAuthenticated')
//requirements: [restrictToAuthenticated]
//       , {
//            destroy: function(id) {
//                // TODO - Write to @response
//            }
//        },
//        {
//            put: function(id) {
//                // TODO - Write to @response
//            }
//        },
//        {
//            http: {url: '/read', method: "PUT"},
//            markAsRead: function(id) {
//                // TODO - Write to @response
//            }
//        }


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
                debugger;

                var message = "Retrieved for values: " + first + ", " + second + ", " + third;

                this.response.send({
                    message: message
                });
            }
        }
    ]
})