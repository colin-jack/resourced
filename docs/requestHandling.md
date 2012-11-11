# Specifying Handlers
When specifying handlers we can either use anonymous objects or we can call methods, the following two are equivalent:
```js
respondsTo: [
    {
        get: function(id) {
            ...
        }
    }]

respondsTo: [
    {
        get: function(id) {
            ...
        }
    }
]
```
You can obviously specify additional configuration on the anonymous object ('schema'), the same can be done using the second object to the http methods (e.g. pass an object with 'schema' property as second argument to http.put).

#Mapping to Http Method
If you call a method of the http object, such as http.put, then the HTTP verb to be used is clear. If you use an anonymous object then the verb to be used is decided:

* If you have specified an ```httpMethod``` value then it is used
* If ```httpMethod``` is not provided then the method name is used. The only interesting case here is that for "delete" you can use "delete" but also "destroy" or "del". The latter two are preferred as "delete" is obviously a reserved word in JS.

###Example
The following both use HTTP method both use GET:
```js
{
    httpMethod: "get",
    getAPerson: function(id, body) {
        ...
    }
}
...

{
    get: function(id, body) {
        ...
    }
}

```

# Argument Population
Values from query/params are passed into your handler as appropriate, so if the URI has an 'id' you can call one of the handler handler method arguments 'id' to get the value passed through.