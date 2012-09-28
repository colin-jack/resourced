// We're using namespace here so that we can require the code under test without resorting
// to absolute/relative paths. This resolves the issues to do with moving files in the production
// code causing annoying changes to tests.
var namespace = require('require-namespace');
module.exports = namespace.createSync('underTest', __dirname + "/../lib/");