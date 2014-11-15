var koa = require('koa');
var bodyParser = require('koa-bodyparser')
var winston = require('winston');
var resourced = require('../index');
var inspect = require('util').inspect;
var errorHandler = require('errorhandler');
var router = require('koa-router');
var Q = require("Q");

// NOTE - Key aspects
// [1] Body parser is required
// [2] Call to configure resourced, it will scan the specified directory for resource files.
// [3] resourced uses generators so using Q.spawn to ensure things happen in correct order
// [4] Routing is required

var createApp = function () {
    winston.info("Creating app.");
    
    var app = koa();
    
    //[1]
    app.use(bodyParser());
    
    // [4]
    app.use(router(app));
    
    return app;
};

var configureResourced = function (app) {
    //[2]
    return resourced.configureResourcesInDirectory(__dirname + '/resources', app);
};

var startListening = function (app) {
    winston.info("Web server is now starting.");
    
    var port = process.env.PORT || 3050;
    
    return app.listen(port, function () {
        winston.info("Web server listening on port " + port + " in " + app.env + " mode.");
        
        return winston.info("Please go to 'http://localhost:" + port + "/people?lastName=smith' to start your exciting journey");
    });
};

var configureLogging = function () {
    return winston.handleExceptions();
};

var setupAndRunServer = function () {
    //[3]
    Q.spawn(function * () {
        configureLogging();
        
        var app = createApp();
        
        yield * configureResourced(app);
        
        startListening(app);
    });
}

setupAndRunServer();