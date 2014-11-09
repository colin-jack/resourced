var testLib = require('require-namespace').createSync(__dirname + "/util", 'testLib');
var baseFixture = require('./../testFixture');

var unitFixture = Object.create(baseFixture);

unitFixture.testLib = testLib;

module.exports = unitFixture;
