var resourced = require('require-namespace').resourced;
var Resource = resourced.Resource;
var cache = resourced.cache;

var ensure = require('rules').ensure;

module.exports = new Resource({
    url: "/kennel/:id",

    cache: cache.minutes(5).publically(),
    
    respondsTo: [
    {
        get: function * (id) {
            ensure(id, "id").populated().numeric({ min: 0 });

            return {
                free: true,
                id: id
            };
        }
    }]
});