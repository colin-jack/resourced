var createReturning = function (toReturn) {
    return {
        get: function * () {
            return toReturn;
        }
    };
}


var createExplicitlySettingBody = function (toSetBodyTo) {
    return {
        get: function * () {
            this.response.body = toSetBodyTo;
            return "irrelevant";
        }
    };
}

module.exports = {
    createReturning: createReturning,
    createExplicitlySettingBody: createExplicitlySettingBody
}