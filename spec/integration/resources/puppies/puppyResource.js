var resourced = require('require-namespace').resourced;
var Resource = resourced.Resource;

var ensureNumericId = require('./validation/ensureNumericId');
var puppySchema = require('./validation/puppySchema');

module.exports = new Resource({
    url: "/puppies/:id",
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
        put: function (id, body) {
            debugger;
            this.response.send(body);
        },

        schema: puppySchema
    }]
});