// Brings all the files inside this directory into a namespace called 'lib', allowing you
// to require using resourcedLib.require('{fileName}') without having to worry about the directory
// structure involved.
var requireNamespace = require('require-namespace');
module.exports = requireNamespace.createSync('lib', __dirname + "/");