var createResponseSpy = function() {
    return { 
        send: function() { 
            debugger;
            var args = Array.prototype.slice.call(arguments);

            if (args.length === 1) {
                this.spiedBody = arguments[0];
            }
            else
            {
                this.spiedStatus = arguments[0];
                this.spiedBody = arguments[1];
            }
        },
        status: function(status) { this.spiedStatus = status }
    };
};

module.exports = {
    createResponseSpy : createResponseSpy
}