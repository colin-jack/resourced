var Resource = lib.require('Resource');
var http = lib.require('http');
var cache = lib.require('cache');

module.exports = new Resource({
    url: "/people/:id",

    cache: cache.minutes(5).publically(),

    respondsTo: [
        {
            httpMethod: 'get',
            bob: function(id) {
                associatedAddressLink = addressResource.getLink("address", { id: "5"});

                return {
                    firstName : "Colin",
                    secondName : "Jack",
                    id : id,
                    address: associatedAddressLink
                };
            }
        },

        http.destroy(function(id) {
            return;
        }),

        http.post(function(id) {
            return;
        }),

        http.put(function(id, body) {
                return body;
            })
    ]
});
