# TODO: Load this using require-namespace
Resource = require('../../lib/resource/Resource')
http = require('../../lib/resource/http')
caching = require('../../lib/caching/cache')

people = [
    { firstName: "bob", lastName: "smith" },
    { firstName: "francis", lastName: "smith" },
    { firstName: "bill", lastName: "bridge" },
    { firstName: "edgar", lastName: "jones" },
    { firstName: "lily", lastName: "wright" },
    { firstName: "mike", lastName: "terry" },
    { firstName: "sarah", lastName: "connors" },
    { firstName: "dorothy", lastName: "fibbers" },
]

module.exports = new Resource({
    url: "/people",

    cache: caching.minutes(5).publically(),

    respondsTo: [
        http.get (from, to) ->
            require('util').log("From: " + from)
            return " ************** OK *************** "

        # http.delete (id) ->
        #     log("Resource deleted");
        #     return;

        # http.post (id) ->
        #     log("Post accepted");
        #     return;

        # http.put (id, body) ->
        #     message = format("You are over-writing the person with ID %s with the object %s.", id, inspect(body));
        #     log(message);

        #     return body;
    ]
});

# TODO: Collection resource
# TODO: Multiple GETS
# TODO: Correct response code for POST (201)
# TODO: Overriding response code for a specific POST
# TODO: Restrict POST to only authenticated users