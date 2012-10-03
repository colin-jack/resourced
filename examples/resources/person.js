// TODO: Load this using require-namespace
var Resource = require('../../lib/Resource'),
    addressResource = require('./address')

// TODO:
//   Use restrict to authenticated
//   Use url on responds to
//   Generate links (HATEOAS)
// TODO:
//   More complex routing example

module.exports = new Resource({
    url: "/people/:id",
    
    cache: {
        minutes : 5,
        where : "private"
    },

    respondsTo: [
        {
            get: function(id) {
                associatedAddressesUri = addressResource.getUri("5");

                // NOTE - We could call "this.response.send(person)" but the assumption is if we don't
                // then the returned object is response.
                return {
                    firstName : "Colin",
                    secondName : "Jack",
                    address: new Link("address", associatedAddressesUri)
                };
            }
        }
    ]
})