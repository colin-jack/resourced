var resourced = require('require-namespace').resourced;
var Resource = resourced.require('Resource');
var http = resourced.require('http');
var cache = resourced.require('cache');

module.exports = new Resource({
    url: "/address/:id",
    cache: cache.forever().publically(),
    respondsTo: [
        http.get(function(id) {
            var address;
            return address = {
                "House Number": 72,
                "Stree Name": "Fox Lane",
                "Town": "Edinburgh",
                "PostCode": "EH99 7JJ"
            };
        })
    ]
});


