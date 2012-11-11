# response caching
The ```cache``` option allows you to control the [HTTP caching](http://www.mnot.net/cache_docs/) to use for the responses to GET requests for the resource. It is applied at the resource level:
```js
module.exports = new Resource({
    ...
    cache: caching.minutes(5).publically(),
```
You must first specify how long to cache for using one of the following:
* minutes - Single argument is number of minutes to cache for.
* hours - Single argument is number of hours to cache for.
* days - Single argument is number of days to cache for.
* forever - If this is used then you are specifying the responses can be cached forever
* no - This method can be used if the responses should not be cached.

If you call any of the methods other than ```no``` then you can specify where to cache. The default is that responses can be cached publically but you can explicitly specify where to cache:
* publically - Since public is the default you would only call this method if you want to make that fact explicit
* privately - Client-side caching only (e.g. browser).

###Examples
```js
var cache = require('resourced').cache;
cache.minutes(5).privately()
cache.days(2)
cache.days(2).publically() // same as above
cache.no()
cache.forever()
```

###Recommended Resources
* [Caching Tutorial for Web Authors and Webmasters](http://www.mnot.net/cache_docs/)
* [Redbot](http://mnot.github.com/redbot/)