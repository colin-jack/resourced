var ensure = require('rules').ensure;

var resourced = require('../../index');
var Resource = resourced.Resource;
var http = resourced.http;
var cache = resourced.cache;

var addressResource = require('./address');

var log = require('util').log;
var format = require('util').format;
var inspect = require('util').inspect;

var people = [
    { firstName: "bob", lastName: "smith", id : 1, "job": "tinker", addressId: 3 },
    { firstName: "francis", lastName: "smith", id : 2, "job": "tailor", addressId: 2 },
    { firstName: "bill", lastName: "bridge", id : 3, "job": "soldier", addressId: 1 }
  ];



module.exports = new Resource({
    url: "/person/:id",

    cache: cache.minutes(5).publically(),

    respondsTo: [
        http.get(function * (id) {
            debugger;
            ensure(id).populated().numeric({ min : 0, max: people.length - 1 });
        
            var person = people[id];
            person.address = this.urlFor(addressResource, { id: person.addressId });

            return person;
        }),

        http.destroy(function * (id) {
            log("Resource deleted");
            return;
        }),

        http.post(function * (id) {
            log("Post accepted");
            return;
        }),

        http.put(function * (id, body) {
            var message = format("You are over-writing the person with ID %s with the object %s.", id, inspect(body));
            log(message);

            return body;
        })
    ]
});