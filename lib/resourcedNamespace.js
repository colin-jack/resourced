// Brings all the files inside this directory into a namespace called 'resourced', allowing you
// to require using resourced.require('{fileName}') without having to worry about the directory
// structure involved.
var requireNamespace = require('require-namespace');
module.exports = requireNamespace.createSync(__dirname + "/", 'resourced');