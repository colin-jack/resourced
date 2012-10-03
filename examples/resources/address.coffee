Resource = require('../../lib/Resource')

module.exports = new Resource
  url: "/address/:id"

  #requirements: [restrictToAuthenticated]

  # We can cache for a long time because we never modify addresses.
  cache:
    years : 10
    where: "private"

  respondsTo: [{
    get: (id) ->
      address =
        "House Name/Number" : 72
        "Stree Name" : "Fox Lane"
        "Town" : "Edinburgh"
        "PostCode" :"EH99 7JJ"
  }]