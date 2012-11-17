var Resource = lib.require('Resource');
var http = lib.require('http');
var cache = lib.require('cache');

module.exports = new Resource({
    url: "/people/:id",

    cache: cache.no(),

    respondsTo: [
        {
            httpMethod: 'get',
            bob: function(id) {
                return {
                    firstName : "Colin",
                    secondName : "Jack",
                    id : id,

                    address: this.urlFor('address', {id: 5})
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
