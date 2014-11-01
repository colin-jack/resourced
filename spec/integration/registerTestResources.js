var express = require('express');
var resourced = require('../../index');
var winston = require('winston');
var bodyParser = require('body-parser');
var Q = require('q');

var registersResources = function * (fixture) {
    var expressApp = express();
    expressApp.use(bodyParser());
    
    var resourcesDir = __dirname + '/resources';
    
    yield * resourced.configureResourcesInDirectory(resourcesDir, expressApp);
    
    fixture.expressApp = expressApp;
    fixture.closeExpress = function () {
        expressApp.close();
    }
}

var getRegisterResourcesWrapper = function (fixture) {
    return function (done) {
        Q.spawn(function *() {
            try {
                yield * registersResources(fixture);
                
                done(null, null);
            } catch (err) {
                done(err, null);
            }
        });
    }
}

module.exports = function (fixture) {
    if (!fixture) throw new Error("You must provide the fixture that the express app will be stored on.");

    return getRegisterResourcesWrapper(fixture);
};