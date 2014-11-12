var resourced = require('require-namespace').resourced;
var Resource = resourced.Resource;
var cache = resourced.cache;

var ensureNumericId = require('./validation/ensureNumericId');
var puppySchema = require('./validation/puppySchema');

module.exports = new Resource({
    url: "/puppies/:id",
    urlSchema: ensureNumericId,
    
    cache: cache.minutes(5).publically(),

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
        put: function (id) {
            debugger;
            this.response.send(this.request.body);
        },

        schema: puppySchema
    }]
});