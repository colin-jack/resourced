var createResponseSpy = function() {
    return { 
        send: function(body) { this.spiedBody = body },
        status: function(status) { this.spiedStatus = status }
    };
};

module.exports = {
    createResponseSpy : createResponseSpy
}