module.exports = {
   assertError : function(done) {
        return function(err, res) {
            assert.isDefined(err)
            assert.instanceOf(err, Error);
            done();
        }
    },

    assertNoError : function(done) {
        return function(err, res) {
            assert.isNull(err);
            done();
        }
    }
}