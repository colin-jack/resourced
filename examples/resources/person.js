// TODO: Load this using require-namespace
var resourced = require('../../index');
var Resource = resourced.Resource;
var http = resourced.http;
var cache = resourced.cache;

var addressResource = require('./addressResource');

var log = require('util').log;
var format = require('util').format;
var inspect = require('util').inspect;

module.exports = new Resource({
    url: "/people/:id",

    cache: caching.minutes(5).publically(),

    respondsTo: [
        http.get(function(id) {
            return {
                firstName : "Colin",
                secondName : "Jack",
                id : id,
                address: this.urlFor(addressResource, {id: 5})
            };
        }),

        http.destroy(function(id) {
            log("Resource deleted");
            return;
        }),

        http.post(function(id) {
            log("Post accepted");
            return;
        }),

        http.put(function(id, body) {
            var message = format("You are over-writing the person with ID %s with the object %s.", id, inspect(body));
            log(message);

            return body;
        })
    ]
});