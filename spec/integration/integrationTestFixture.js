var Q = require('q')
var express = require('express');
var winston = require('winston');
var bodyParser = require('body-parser');
var resourceTest = require('testresources')

var baseFixture = require('./../testFixture');

var resourced = baseFixture.resourced;

var registerTestResources = function * (expressApp) {
    var resourcesDir = __dirname + '/resources';
    
    debugger;
    
    yield * resourced.RegistersResources.registerAllInDirectory(resourcesDir, expressApp);
};

// We want to setup the express server exactly once for each test run, this method ensures that is what happens.
var startExpressServer = function () {
    if (fixture.server) return;
    
    var deferred = Q.defer();

    Q.spawn(function *() {
        
        try {
            var expressApp = express();
            expressApp.use(bodyParser());
            
            yield * registerTestResources(expressApp)
            
            debugger;
            
            var serverWrapper = resourceTest.startServer(expressApp);
            
            yield * serverWrapper.ensureServerRunning();
            
            fixture.server = serverWrapper;
            
            Object.defineProperty(fixture, "port", { get: function () { return this.server.port; } });
            
            deferred.resolve();            
        } catch (e) {
            winston.error("Error during preperation for test: " + e);
            
            deferred.reject(e);
            
            throw e;
        }
    });

    return deferred.promise;
};

var fixture = Object.create(baseFixture);
fixture.ensureSetup = startExpressServer;

module.exports = fixture;