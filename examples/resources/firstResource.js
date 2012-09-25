var Resource = require('../../Resource')
var winston = require('winston');


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
    url: "/things/:id",
    
    cache: {
        years : 10,
        where : "private"
    },

    respondsTo: 
    [
        {
            get: function(id, $logger) {
                debugger;

                winston.info("Request for things with id '" + id + "'");

                this.response.send({
                    message: "Get for thing with ID: " + id
                });
            }
        }
    ]
})