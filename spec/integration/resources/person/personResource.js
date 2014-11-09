//var resourced = require('require-namespace').resourced;
//var Resource = resourced.require('Resource');
//var http = resourced.require('http');
//var cache = resourced.require('cache');
//var addressResource = require('./addressResource');

//module.exports = new Resource({
//    url: "/people/:id",

//    cache: cache.no(),

//    respondsTo: [
//        {
//            httpMethod: 'get',
//            get: function (id) {
            
//                debugger;

//                return {
//                    firstName : "Colin",
//                    secondName : "Jack",
//                    id : id,

//                    address: this.urlFor(addressResource, {id: 5})
//                    // address: this.urlFor(addressResource.get, {id: 5})
//                };
//            }
//        },

//        http.destroy(function(id) {
//            return;
//        }),

//        http.post(function(id) {
//            return;
//        }),

//        http.put(function(id, body) {
//                return body;
//            })
//    ]
//});
