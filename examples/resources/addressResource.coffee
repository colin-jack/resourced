Resource = require('../../lib/resource/Resource')
cache = require('../../lib/caching/cache')

module.exports = new Resource
  url: "/address/:id"

  #securedBy: [restrictToAuthenticated]

  # We can cache for a long time because we never modify addresses.
  cache: cache.forever().publically(),

  respondsTo: [{
    get: (id) ->
      address =
        "House Name/Number" : 72
        "Stree Name" : "Fox Lane"
        "Town" : "Edinburgh"
        "PostCode" :"EH99 7JJ"
  }]