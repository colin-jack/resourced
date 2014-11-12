var Q = require('q')
var express = require('express');
var winston = require('winston');
var bodyParser = require('body-parser');
var resourceTest = require('testresources')
var morgan = require('morgan')

var baseFixture = require('./../testFixture');

var resourced = baseFixture.resourced;

var registerTestResources = function * (expressApp) {
    var resourcesDir = __dirname + '/resources';
    
    yield * resourced.RegistersResources.registerAllInDirectory(resourcesDir, expressApp);
};

var deferred;

// We want to setup the express server exactly once for each test run, this method ensures that is what happens.
var startExpressServer = function () {
    if (fixture.server || deferred) return deferred.promise;
    
    deferred = Q.defer();

    Q.spawn(function *() {
        
        try {
            var expressApp = express();
            expressApp.use(bodyParser.json());
            expressApp.use(morgan("combined"));
            
            yield * registerTestResources(expressApp)
            
            var serverWrapper = yield resourceTest.startServer(expressApp);
            
            fixture.server = serverWrapper;
            
            debugger;
            
            Object.defineProperty(fixture, "port", { get: function () { return this.server.port; } });

            deferred.resolve();            
        } catch (e) {
            debugger;
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