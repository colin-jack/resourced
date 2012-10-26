Resource = require('../../../lib/resource/Resource')
http = require('../../../lib/resource/http')
caching = require('../../../lib/caching/cache')

ensureNumericId = require('./ensureNumericId')
puppySchema = require('./puppySchema')
puppyChangeProcessor = require('./puppyChangeProcessor')

module.exports = new Resource(
  url: "/puppies/:id",

  cache: caching.minutes(5).publically(),

  respondsTo: [
      get: (id) ->
          name: "spot"
      
      #TODO - Support
      arguments: ensureNumericId 
    ,
      put: (id, body) ->
        #TODO: Transformation logic needed from body....
        puppyChangeProcessor(original, body, this.populateResponse);

      arguments: ensureNumericId,

      body: puppySchema
  ]
)





    