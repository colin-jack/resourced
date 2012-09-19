var Resource = require('../../Resource')


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
            get: function(id) {
                json = {
                    message: "Get for thing with ID: " + id
                }
                this.response.send(json);
            }
        }
    ]
})