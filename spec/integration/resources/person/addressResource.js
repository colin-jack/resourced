var Resource = lib.require('Resource');
var http = lib.require('http');
var cache = lib.require('cache');

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


