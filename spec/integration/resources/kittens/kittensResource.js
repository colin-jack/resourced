var Resource = resourcedLib.require('Resource');
var http = resourcedLib.require('http');
var cache = resourcedLib.require('cache');
var mustBe = require('rules').mustBe;

module.exports = new Resource({
    url: "/kittens/:id",
    cache: cache.minutes(5).publically(),

    urlSchema: {
        id: mustBe().numeric().populated()
    },

    respondsTo: [
    {
        get: function(id, body) {
            return {
                name: "mikado"
            };
        }
    },
    {
        // TODO: Support this
        url: "/sendToCattery",

        post: function(id, cattery, body) {
            // TODO: Include content-location and optionally caching header
            return {
                name: "mikado",
                mood: "annoyed"
            };
        },

        urlSchema: {
            // TODO: Support this
            //cattery: mustBe().numeric().containedIn(validateCatteries)
        },
    }]
});