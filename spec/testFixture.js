// TODO - If this proves useful then move it from here
// Might as well get long stack traces in tests.
require('longjohn')

// A namespace is used so that reorganising the folder containing the code under test doesn't result in 
// lots of broken tests.
var libNamespace = require('./../lib/namespace');
global.lib = libNamespace;
module.exports = libNamespace;