var createFakeRequest  = function(query) {
    query = query || {};

    return {
        query: query
    }
}

var createFakeResponse = function () {
    return {
        body: null,
        status: null
    };
};

module.exports = {
    createFakeRequest : createFakeRequest,
    createFakeResponse: createFakeResponse
}