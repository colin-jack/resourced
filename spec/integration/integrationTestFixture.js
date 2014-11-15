var Q = require('q')
var winston = require('winston');

var koa = require('koa');
var bodyParser = require('koa-bodyparser');
var router = require('koa-router');
var logger = require('koa-logger')

var resourceTest = require('testresources')

var baseFixture = require('./../testFixture');
var resourced = baseFixture.resourced;

var registerTestResources = function * (app) {
    var resourcesDir = __dirname + '/resources';
    
    yield * resourced.RegistersResources.registerAllInDirectory(resourcesDir, app);
};

var deferred;

// We want to setup the express server exactly once for each test run, this method ensures that is what happens.
var startKoaServer = function () {
    if (fixture.server || deferred) return deferred.promise;
    
    deferred = Q.defer();

    Q.spawn(function *() {
        
        try {
            var app = koa();
            app.use(logger());       
            app.use(bodyParser());
            app.use(router(app));
            
            yield * registerTestResources(app)
            
            var serverWrapper = yield resourceTest.startServer(app);
            
            fixture.server = serverWrapper;
            
            //debugger;
            
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

fixture.ensureSetup = startKoaServer;

module.exports = fixture;