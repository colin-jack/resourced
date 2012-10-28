var express = require('express');
var resourced = require('../../index')

global.app = express();
app.use(express.bodyParser());

var resourcesDir = __dirname + '/resources';
console.log("About to load resources from: " + resourcesDir);

var registered = false;

var callDone = function(done) {
    if (done)
        done();
}

module.exports = function(done) {
    if (registered) {
        callDone(done);
        return;
    }

    var onRegistered = function() {
        registered = true;
        callDone(done);
    }

    resourced.configureResourcesInDirectory(resourcesDir, onRegistered);
};