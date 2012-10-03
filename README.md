# restless
NOTE - This is a very very early version of this project.

A simple DSL for building a resource oriented design on top of express.js. 

Note what we're aiming for here is not the resource oriented style popularised by Rails, instead we're going for an approach where you can declaritively define your resoruces and then use the full power of linking to start getting some of that HATEOAS magic. 

## Samples
### Configuration
To configure restless you need to tell it which directory to look for resources in:

```js
var resourcesDirectory = __dirname + '/resources';
restless.configureResourcesInDirectory(resourcesDirectory, done);
```

The directory will be scanned for files including resources.

### Creating Resources
#### JavaScript
```js
var Resource = require('restless').Resource;

module.exports = new Resource({
    url: "/things/:third/:first/:second",
    
    cache: {
        years : 10,
        where : "private"
    },

    respondsTo: [
        {
            get: function(third, second, first) {
                var message = "Retrieved for values: " + first + ", " + second + ", " + third;

                this.response.send({ message: message });
            }
        }
    ]
})
```
## Running Examples
You can run the sample application using the following command:

    node examples/web.js
    
The output will end with a hard-coded URL that you can use to GET the first resource, the response will be something like:

## Running Tests
The tests use [vows](http://vowsjs.org/) and can be run using:

    vows spec/**/*_spec.js --spec