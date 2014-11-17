[![Build Status](https://travis-ci.org/colin-jack/resourced.png)](https://travis-ci.org/#!/colin-jack/resourced)

A resource-oriented DSL for configuring koa.

### Configuration
To configure resourced you need to tell it which directory to look for resources in:

```js
var resourced = require('resourced');
var router = require('koa-router');

Q.spawn(function *() {
    // ...

    app.use(router(app));

    var resourcesDir = __dirname + '/resources';

    yield * resourced.configureResourcesInDirectory(resourcesDir, app);

    // ,,,
});
```
Note that [koa-router]() is also required and that it, and any other middleware, must be installed before resourced.

### Resource Definition
The following shows a simple person resource, where the JSON response includes a link to the associated address:
```js
var Resource = require('resourced').Resource;
var http = require('resourced').http;
var cache = require('resourced').cache;
var ensure = require('rules').ensure;

var addressResource = require('./address');

var people = [
    { firstName: "bob", lastName: "smith", id : 1, "job": "tinker", addressId: 3 }
];

module.exports = new Resource({
    url: "/person/:id",

    cache: cache.minutes(5).publically(),

    respondsTo: [
        http.get(function * (id) {
            ensure(id).populated().numeric({ min : 0 });
        
            var person = people[id];

            person.address = this.urlFor(addressResource, { id: person.addressId });

            return person;
        })
    ]
});
```

## <a name="example"/>Running Examples
You can run the sample application using the following command:

    node --harmony examples\web.js

##Features
* [Request Handlers](https://github.com/colin-jack/resourced/blob/master/docs/requestHandling.md) - Features like argument population make handling requests easier.
* [Caching](https://github.com/colin-jack/resourced/blob/master/docs/caching.md) - HTTP caching of responses to GET requests.
* [Validation](https://github.com/colin-jack/resourced/blob/master/docs/validation.md) - Allows validation of request bodies and URL's.