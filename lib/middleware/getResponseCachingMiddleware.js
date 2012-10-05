var SecondsInMinute = 60;
var MinutesInHour = 60;
var HoursInDay = 24;

var getMaxAge = function(cachingDefinition) {
    debugger;
    if (cachingDefinition.days) {
        return cachingDefinition.days * getDaysMultiplier();
    } 

    if (cachingDefinition.hours) {
        return cachingDefinition.hours * getHoursMultiplier();
    }

    if (cachingDefinition.minutes) {
        return cachingDefinition.minutes * SecondsInMinute;
    }
}
var getDaysMultiplier = function() {
    return getHoursMultiplier() * HoursInDay;
};

var getHoursMultiplier = function() {
    return SecondsInMinute * MinutesInHour;
};

var getWhereToCache = function(cachingDefinition) {
    return cachingDefinition.where ? cachingDefinition.where.toString().toLowerCase() : "private";
}

var getResponseCachingMiddleware = function(cachingDefinition) {
    if (!cachingDefinition) {
        return null;
    }
    
    var where = cachingDefinition.where || "private";
    var maxAge = getMaxAge(cachingDefinition);
    var location = getWhereToCache(cachingDefinition);
    var cacheControlValue = 'max-age:' + maxAge + ", " + location;

    return function(request, response, next) {
        response.header('Cache-Control', cacheControlValue)
        next();
    }
};

module.exports = getResponseCachingMiddleware;