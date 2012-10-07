var HttpMethod = {
    GET: "get",
    POST: "post",
    DELETE: "delete",
    PUT: "put", 

    canHandle : function(httpMethodString) {
        return this[httpMethodString.toUpperCase()];
    }
}

module.exports = HttpMethod;