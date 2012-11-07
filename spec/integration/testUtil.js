module.exports = {
   assertError : function(expectedMessage, done) {
        return function(err) {
            assert.isDefined(err, "Expected an error")
            
            if (expectedMessage instanceof RegExp) {
                assert.match(err, expectedMessage);
                done();
            }
            else {
                expectedMessage();
                assert.isFalse(true, "You must provide an expected message. Error was: " + err)
            }
            
        }
    },

    assertNoError : function(done) {
        return function(err, res) {
            assert.isUndefined(err, "Did not expect an error");
            done();
        }
    }
}