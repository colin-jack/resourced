var HttpMethod = {
    GET: "get",
    POST: "post",
    DELETE: "delete",
    PUT: "put", 

    mapFrom: function mapFrom(httpMethodString) {
        var upperCase = httpMethodString.toUpperCase();

        if (upperCase === "DEL" || upperCase === "DESTROY") {
            return this.DELETE;
        }

        return this[upperCase];
    }
}

module.exports = HttpMethod;