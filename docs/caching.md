# response caching
The ```cache``` option allows you to control the HTTP caching to use for the responses to GET requests for the resource. It is applied at the resource level:
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

If you call any of the methods other than ```no``` then you can specify where to cache: