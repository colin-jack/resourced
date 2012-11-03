var createResponseSpy = function() {
    return { 
        send: function() {},
        status: function(status) { this.spiedStatus = status }
    };
};

module.exports = {
    createResponseSpy : createResponseSpy
}