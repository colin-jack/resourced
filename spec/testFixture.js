var chai = require('chai');
chai.use(require('chai-as-promised'));

module.exports = {
    assert: chai.assert,
    resourced: require('./../lib/namespace') // the namespace contaning code unt test
}