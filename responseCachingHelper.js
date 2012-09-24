module.exports = {
    getResponseCachingRouteMiddleware: function(cachingDefinition) {
        if (!cachingDefinition) {
            return null;
        }
        
        var where = cachingDefinition.where || "private";
        var maxAge = cachingDefinition.years ? cachingDefinition.years * 60 * 60 : 0;

        return function(request, response, next) {
            response.header('Cache-Control', where + ', max-age:' + maxAge)
            next();
        }
    }
}