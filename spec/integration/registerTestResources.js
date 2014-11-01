var express = require('express');
var resourced = require('../../index');
var winston = require('winston');
var bodyParser = require('body-parser');
var Q = require('Q');

var registersResources = function * (fixture) {
    var expressApp = express();
    expressApp.use(bodyParser());
    
    var resourcesDir = __dirname + '/resources';
    
    winston.log("info", "********************** About to load resources from: " + resourcesDir);
    
    yield * resourced.configureResourcesInDirectory(resourcesDir, expressApp);
    
    winston.log("info", "********************** Finished loading resources from: " + resourcesDir);

    fixture.expressApp = expressApp;
    fixture.closeExpress = function () {
        debugger;
        expressApp.close();
    }
}

var getRegisterResourcesWrapper = function (fixture) {
    return function (done) {
        Q.spawn(function *() {
            try {
                winston.log("info", "*****  STARTING NEW EXPRESS APP");

                yield * registersResources(fixture);
                
                winston.log("info", "** INIT DONE");
                
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