var _u = require('underscore'), 
    CachingDefinition = require('./CachingDefinition'),
    NoCachingDefinition = require('./NoCachingDefinition');

var SecondsInMinute = 60;
var MinutesInHour = 60;
var HoursInDay = 24;

var getDaysMultiplier = function() {
    return getHoursMultiplier() * HoursInDay;
};

var getHoursMultiplier = function() {
    return SecondsInMinute * MinutesInHour;
};

// Default to caching publically but give options to over-ride that behavior.
var getLocationOptions = function(seconds) {
    var cachingDefinition = new CachingDefinition(seconds, "public");

    var locationFluentInterface = {
        publically : function() { return this; },
        privately : function() { return new CachingDefinition(seconds, "private"); }
    };

    return _u.extend(cachingDefinition, locationFluentInterface)
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

/*
Fluent interface for helping to define how long to cache a resource. Start with how long to cache for
and then specify where to cache.
*/
var caching = {
    minutes: cacheForMinutes,
    hours: cacheForHours,
    days: cacheForDays,
    no: doNotCache,
    forever: cacheForever
};

module.exports = caching;