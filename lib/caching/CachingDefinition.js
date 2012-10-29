var CachingDefinition = function(seconds, where) {
    this.seconds = seconds;
    this.where = where;
};

CachingDefinition.prototype.getCacheControlValue = function() {
    return 'max-age=' + this.seconds + ", " + this.where;
}

module.exports = CachingDefinition;