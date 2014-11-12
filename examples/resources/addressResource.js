var resourced = require('../../index');
var Resource = resourced.Resource;
var http = resourced.http;
var cache = resourced.cache;

var presetAddress = {
  "House Name/Number": 72,
  "Stree Name": "Fox Lane",
  "Town": "Edinburgh",
  "PostCode": "EH99 7JJ"
};

var addressResource = new Resource({
  url: "/address/:id",

  cache: cache.forever().publically(),

  respondsTo: [
  
    http.get(function(id) {
      var address;

      return presetAddress;
    });
  ]
});

module.exports = addressResource