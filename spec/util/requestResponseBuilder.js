var createFakeResponse = function() {
    return {
        send: function() {}
    };
}

var requestResponseBuilder = {
    createFakeResponse : createFakeResponse

}

module.exports = requestResponseBuilder