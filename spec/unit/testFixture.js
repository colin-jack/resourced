// Might as well get long stack traces in tests.
//require('longjohn')

// A namespace is used so that reorganising the folder containing the code under test doesn't result in 
// lots of broken tests (avoids paths like ./../../../lib/Resource from tests)
var libNamespace = require('./../../lib/namespace');
global.lib = libNamespace;

var requireNamespace = require('require-namespace');
global.testLib = requireNamespace.createSync('testLib', __dirname + "/");

// setup a few globals so we don't need to keep importing things into the test files
global.assert = require('chai').assert


//module.exports = libNamespace;
//fixture = module.exports