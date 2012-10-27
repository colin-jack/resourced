var Resource = lib.require('Resource');
var http = lib.require('http');
var cache = lib.require('cache');

var ensureNumericId = require('./ensureNumericId');
var puppySchema = require('./puppySchema');
var puppyChangeProcessor = require('./puppyChangeProcessor');

module.exports = new Resource({
  url: "/puppies/:id",
  cache: cache.minutes(5).publically(),
  respondsTo: [
    {
      get: function(id) {
        return {
          name: "spot"
        };
      },
      "arguments": ensureNumericId
    }, 
    {
      put: function(id, body) {
        return puppyChangeProcessor(original, body, this.populateResponse);
      },
      "arguments": ensureNumericId,
      body: puppySchema
    }
  ]
});