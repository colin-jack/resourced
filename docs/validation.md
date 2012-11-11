# validation
Validation is performed by the [rules](https://github.com/colin-jack/rules) module, you can apply validation for the request body:
```js
    respondsTo: [
    {
        put: function(id, body) {
            ...
        },

        schema:  {
            name: mustBe().populated().string({ maxLength: 50 })
        }
    }]
```
You can apply the urlSchema to the entire resource (or at the method level if ypu prefer):
```js
module.exports = new Resource({
    url: "/kittens/:id",
    urlSchema: {
        id: mustBe().numeric().populated()
    },
    ...
```
Requests that do not adhere to the schema(s) will result in a [400 response code](http://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html).