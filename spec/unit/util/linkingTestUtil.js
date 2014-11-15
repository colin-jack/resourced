var fakeRequest = {
    protocol: "https",
    get: function(headerToGet) {
        if (headerToGet === 'host') {
            return "foo.com:35"
        }
    }
};

module.exports = {
    fakeRequest: fakeRequest
}