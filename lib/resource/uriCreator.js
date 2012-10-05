var createUri = function(resourceDefinition, params) {
    var unpopulatedUrl = resourceDefinition.url;

    if (!params) {
        return unpopulatedUrl;
    }

    for (param in params) if (params.hasOwnProperty(param)) {
        // we're looking for a token to replace (:id) followed by either end of line
        // or "&" or "/" (not capturing these last two characters)
        var regex = RegExp(":" + param  + "(?=([/&?]+|$))", "g");
        unpopulatedUrl = unpopulatedUrl.replace(regex, params[param]);
    }

    return unpopulatedUrl;
};

module.exports = {
    createUri : createUri
};