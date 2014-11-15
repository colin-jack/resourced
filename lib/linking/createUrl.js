var createUrl = function(resourceDefinition, params, request) {
    var relativeUrl = createRelativeUrl(resourceDefinition, params);
    var baseUrl = createBaseUrl(request);

    return baseUrl + relativeUrl;
};


var createBaseUrl = function createBaseUrl(request) {
    return request.protocol + "://" + request.get('host');
}

var createRelativeUrl = function createRelativeUrl(resourceDefinition, params) {
    var relativeUrl = resourceDefinition.url;

    if (!params) {
        return relativeUrl;
    }

    for (var param in params) {
        if (params.hasOwnProperty(param)) {
            // we're looking for a token to replace (:id) followed by either end of line
            // or "&" or "/" (not capturing these last two characters)
            var regex = new RegExp(":" + param  + "(?=([/&?]+|$))", "g");
            relativeUrl = relativeUrl.replace(regex, params[param]);
        }
    }

    return relativeUrl;
};

module.exports = createUrl;