var Resource = lib.require('Resource');
var http = lib.require('http');
var cache = lib.require('cache');
var mustBe = require('rules').mustBe;

var ensureNumericId = {
    id: mustBe().numeric().populated()
};

var kittenSchema = {
    name: mustBe().populated().string({ maxLength: 50 }),
}

module.exports = new Resource({

    url: "/kittens/:id",
    cache: cache.minutes(5).publically(),
    schema: kittenSchema,

    respondsTo: [
    {
        put: function(id, body) {
        },

        argumentRules: ensureNumericId,
    }]
});