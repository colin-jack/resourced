# resourced (node.js)
![Build Status](https://travis-ci.org/colin-jack/resourced.png)

NOTE - This is a very early version of this project and is not yet fully featured.
## Philosophy
It makes sense to use a general purpose web framework such as express.js for JSON service layers, but when designing such service layers it also makes sense to design in terms of HTTP accessible resources. 

This lightweight DSL thus introduces abstractions that make it easy to design in a resource-oriented (RESTful) style. Each resource contains:
* URL - The address of the resource.
* Methods - One or more HTTP request handler methods.
* Caching - Where and how long to cache responses from the resource (optional).
* Middleware - Middleware to run before and after requests, for example to perform authorization (optional).

## Samples
All these samples are taken from the [example application](#example).

### Configuration
To configure restless you need to tell it which directory to look for resources in:

```js
var resourcesDirectory = __dirname + '/resources';
resourced.configureResourcesInDirectory(resourcesDirectory, done);
```
The directory will be scanned for files including resources. You must also tell express to use the body parser:
```js
app.use(express.bodyParser())
```

### Resource Definition - JavaScript
The following shows a simple person resource, where the JSON response includes a link to the associated address:
```js
var Resource = require('resourced').Resource
    http = require('resourced').http,
    cache = require('resourced').cache;

module.exports = new Resource({
    url: "/people/:id",

    cache: caching.minutes(5).publically(),

    respondsTo: [
        http.get(function(id) {
            associatedAddressLink = addressResource.getLink("address", { id: "5"});

            return {
                firstName : "Colin",
                secondName : "Jack",
                id : id,
                address: associatedAddressLink
            };
        }),
        
        http.put(function(id, body) {
            return body;
        })
    ]
});
```
The response to a GET request for the associated URI (for example /people/5) would be:

    HTTP/1.1 200 OK
    X-Powered-By: Express
    Cache-Control: max-age=300, public
    Content-Type: application/json; charset=utf-8
    Content-Length: 129
    ...
    {
      "firstName": "Colin",
      "secondName": "Jack",
      "id": "5",
      "address": {
        "rel": "address",
        "url": "/address/5"
      }
    }
Note the link to the associated address in the response. 

You can also send a PUT request to the resource, the example shown just echoes the request body back in the response. The only interesting things to note about the put example are that the request body will be passed in as an argument to the handler method and the response does not have the cache-contro header set (only GET requests are cached currently).

### Resource Definition - CoffeeScript
The following shows the address resource linked to by the person resource shown above:
```coffeescript
module.exports = new Resource
  url: "/address/:id"

  # We can cache for a long time because we never modify addresses.
  cache: cache.forever().publically(),

  respondsTo: [
    http.get (id) ->
      address =
        "House Name/Number" : 72
        "Stree Name" : "Fox Lane"
        "Town" : "Edinburgh"
        "PostCode" :"EH99 7JJ"
  ]
```
## <a name="example"/>Running Examples
You can run the sample application using the following command:

    node examples/web.js
    
The output will end with a hard-coded URL that you can use to interact with the first resource:

GET ```curl http://localhost:3050/people/5```<br/>
PUT ```curl -i -H "Content-Type: application/json" -X PUT 'http://localhost:3050/people/5' -d '{"firstName":"Mighty"}'```<br/>
POST ```curl -i -X DELETE 'http://localhost:3050/people/5'```<br/>
DELETE ```curl -i -X POST 'http://localhost:3050/people/5'```

## Running Tests
The tests should provide a reasonable spec for the framework. They use [mocha](http://visionmedia.github.com/mocha/) so you first need to install it:

    npm install -g mocha

You can then run the tests using ```npm test``` or:

    mocha -R spec spec/unit/testFixture spec/unit -w -G --recursive -b
    mocha -R spec spec/integration/testFixture spec/integration -w -G --recursive -b