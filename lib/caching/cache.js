var CachingDefinition = require('./CachingDefinition'),
    NoCachingDefinition = require('./NoCachingDefinition');

// Fluent interface for helping to define how long to cache a resource

var SecondsInMinute = 60;
var MinutesInHour = 60;
var HoursInDay = 24;

var getDaysMultiplier = function() {
    return getHoursMultiplier() * HoursInDay;
};

var getHoursMultiplier = function() {
    return SecondsInMinute * MinutesInHour;
};

var cachePublically = function(seconds) {
    return new CachingDefinition(seconds, "public");
};

var cachePrivately = function(seconds) {
    return new CachingDefinition(seconds, "private");
};

var getLocationOptions = function(seconds) {
    return {
        publically : function() { return cachePublically(seconds); },
        privately : function() { return cachePrivately(seconds); }
    };
};

var cacheForMinutes = function(minutes) {
    var seconds = minutes * SecondsInMinute;

    return getLocationOptions(seconds);
};

var cacheForHours = function(hours) {
    var seconds = hours * getHoursMultiplier();

    return getLocationOptions(seconds);
};

var cacheForDays = function(days) {
    var seconds = days * getDaysMultiplier();

    return getLocationOptions(seconds);
};

var doNotCache = function() {
    return new NoCachingDefinition();
};

var cacheForever = function() {
    var TenYearsInSeconds = 315360000;
    return getLocationOptions(TenYearsInSeconds);
};

var caching = {
    minutes: cacheForMinutes,
    hours: cacheForHours,
    days: cacheForDays,
    no: doNotCache,
    forever: cacheForever
};

module.exports = caching;