var createResponseSpy = function() {
    return {
        send: function() {}
    };
}

var requestResponseBuilder = {
    createResponseSpy : createResponseSpy

}

module.exports = requestResponseBuilder