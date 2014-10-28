var shouldCorrectlyFailValidation = function (responseSpy, expectedBody, returned) {
    assert.equal(responseSpy.spiedStatus, 400, "Status code should have been 400");   
    assert.deepEqual(responseSpy.spiedBody, expectedBody);
    assert.isFalse(returned, "The validation method should have returned false.")
}

module.exports = {
    shouldCorrectlyFailValidation: shouldCorrectlyFailValidation
}