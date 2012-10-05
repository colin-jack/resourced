var NoCachingDefinition = function() {
};

NoCachingDefinition.prototype.getCacheControlValue = function() {
    return "no-cache"
}

module.exports = NoCachingDefinition;