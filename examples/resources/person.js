// // TODO: Load this using require-namespace
// var Resource = require('../../lib/resource/Resource'),
//     http = require('../../lib/resource/http'),
//     caching = require('../../lib/caching/cache'),
//     addressResource = require('./addressResource'),
//     log = require('util').log,
//     format = require('util').format,
//     inspect = require('util').inspect;

// module.exports = new Resource({
//     url: "/people/:id",

//     cache: caching.minutes(5).publically(),

//     respondsTo: [
//         http.get(function(id) {
//             associatedAddressLink = addressResource.getLink("address", { id: "5"});

//             return {
//                 firstName : "Colin",
//                 secondName : "Jack",
//                 id : id,
//                 address: associatedAddressLink
//             };
//         }),

//         http.delete(function(id) {
//             log("Resource deleted");
//             return;
//         }),

//         http.post(function(id) {
//             log("Post accepted");
//             return;
//         }),

//         http.put(function(id, body) {
//             var message = format("You are over-writing the person with ID %s with the object %s.", id, inspect(body));
//             log(message);

//             return body;
//         })
//     ]
// });