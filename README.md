# restless
NOTE - This is a very very early version of this project, definitely not ready for use.

A simple DSL for building a resource-oriented design on top of express.js. 

Note what we're aiming for here is not the resource oriented style popularised by Rails. Instead we're going for an approach where you can define your resoruces and then use the full power of linking to start getting some of that RESTful HATEOAS magic. 

## Samples
### Configuration
To configure restless you need to tell it which directory to look for resources in:

```js
var resourcesDirectory = __dirname + '/resources';
restless.configureResourcesInDirectory(resourcesDirectory, done);
```

The directory will be scanned for files including resources.

### Resource Definitions
The following samples show resource from the [runnable example](#example).

#### JavaScript
The following shows a simple person resource, where the JSON response includes a link to the associated address:
```js
var Resource = require('restless').Resource;

module.exports = new Resource({
    url: "/people/:id",

    cache: caching.minutes(5).publically(),

    respondsTo: [
        {
            //cache: caching.minutes(10).publically(),
            get: function(id) {
                associatedAddressLink = addressResource.getLink("address", { id: "5"});

                return {
                    firstName : "Colin",
                    secondName : "Jack",
                    id : id,
                    address: associatedAddressLink
                };
            }
        }
    ]
});
```
The response to a GET request for the associated URI (for example /people/5) would be:
```js
{
  "firstName": "Colin",
  "secondName": "Jack",
  "id": "5",
  "address": {
    "rel": "address",
    "url": "/address/5"
  }
}
```
And the caching information will be included in the response headers:

    Cache-Control:max-age:300, public

#### CoffeeScript
```coffeescript
```

## <a name="example"/>Running Examples
You can run the sample application using the following command:

    node examples/web.js
    
The output will end with a hard-coded URL that you can use to GET the first resource, the response will be something like:

## Running Tests
The tests use [vows](http://vowsjs.org/) and can be run using:

    vows spec/**/*_spec.js --spec