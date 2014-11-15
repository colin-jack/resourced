var ensure = require('rules').ensure;

var resourced = require('../../index');
var Resource = resourced.Resource;
var http = resourced.http;
var cache = resourced.cache;

var presetAddresses = [
    { "House Number": 72, "Street": "Fox Lane", "Town": "Edinburgh", "PostCode": "EH99 7JJ" },
    { "House Number": 12, "Street": "Henderson Row", "Town": "Edinburgh", "PostCode": "EH87 7GJ" },
    { "House Number": 4, "Street": "Merchiston Lane", "Town": "Edinburgh", "PostCode": "EH87 7GJ" },
]

var addressResource = new Resource({
  url: "/address/:id",

  cache: cache.forever().publically(),

  respondsTo: [
  
    http.get(function * (id) {
        //debugger;
        
        ensure(id).populated().numeric({ min : 0, max: presetAddresses.length - 1 });

        return presetAddresses[id];
    })
  ]
});

module.exports = addressResource