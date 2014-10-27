var createReturning = function (toReturn) {
    return {
        get: function () {
            return toReturn;
        }
    };
}


var createExplicitlyRendering = function (toReturn) {
    return {
        get: function () {
            this.response.render(toReturn);
            return "irrelevant";
        }
    };
}

module.exports = {
    createReturning: createReturning,
    createExplicitlyRendering: createExplicitlyRendering
}