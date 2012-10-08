var HttpMethod = {
    GET: "get",
    POST: "post",
    DELETE: "delete",
    PUT: "put", 

    canHandle : function(httpMethodString) {
        return this.hasOwnProperty(httpMethodString.toUpperCase());
    }
}

module.exports = HttpMethod;