module.exports = {
    assertNoError : function(done) {
        return function(err, res) {
            assert.isUndefined(err, "Did not expect an error");
            done();
        }
    }
}