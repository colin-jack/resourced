// TODO: Load this using require-namespace
var Resource = require('../../lib/Resource'),
    Link = require('../../lib/Link'),
    addressResource = require('./addressResource'),
    log = require('util').log,
    format = require('util').format,
    inspect = require('util').inspect;

module.exports = new Resource({
    url: "/people/:id",
    
    cache: {
        minutes : 5,
        where : "private"
    },

    respondsTo: [
        {
            get: function(id) {
                associatedAddressesUri = addressResource.getUri({ id: "5"});

                // NOTE - We could call "this.response.send(person)" but since this is a GET if we don't
                // but return an object then that's what goes in the response.
                return {
                    firstName : "Colin",
                    secondName : "Jack",
                    id : id,
                    address: new Link("address", associatedAddressesUri)
                };
            }
        },
        {
            put : function(id, body) {
                var message = format("You are over-writing the person with ID %s with the object %s.", id, inspect(body));
                log(message);

                return body;
            }
        }
    ]
});