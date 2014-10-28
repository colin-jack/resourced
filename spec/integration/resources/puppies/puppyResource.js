var resourced = require('require-namespace').resourced;
var Resource = resourced.require('Resource');
var http = resourced.require('http');
var cache = resourced.require('cache');

var ensureNumericId = require('./validation/ensureNumericId');
var puppySchema = require('./validation/puppySchema');

module.exports = new Resource({
    url: "/puppies/:id",
    cache: cache.minutes(5).publically(),

    urlSchema: ensureNumericId,

    respondsTo: [
    {
        get: function(id) {
            return {
                name: "spot",
                id: id
            };
        }
    }, 
    {
        put: function(id, body) {
        },

        schema: puppySchema
    }]
});