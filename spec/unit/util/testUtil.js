var createFakeRequest  = function(params, query) {
    params = params || {};
    query = query || {};

    return {
        params: params,
        query: query
    }
}

module.exports = {
    createFakeRequest : createFakeRequest
}