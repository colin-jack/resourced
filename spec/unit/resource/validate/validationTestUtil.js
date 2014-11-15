var fixture = require('./../../unitTestFixture');
var assert = fixture.assert;

var shouldCorrectlyFailValidation = function (fakeResponse, expectedBody, returned) {
    assert.equal(fakeResponse.status, 400, "Status code should have been 400");   
    assert.deepEqual(fakeResponse.body, expectedBody);
    assert.isFalse(returned, "The validation method should have returned false.")
}

module.exports = {
    shouldCorrectlyFailValidation: shouldCorrectlyFailValidation
}