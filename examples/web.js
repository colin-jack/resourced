var express = require('express');
var winston = require('winston');
var resourced = require('../index');
var inspect = require('util').inspect;
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var q = require("Q");

// NOTE - Key aspects
// [1] Body parser is required
// [2] Call to configure resourced, it will scan the specified directory for resource files.
// [3] resourced uses generators so using Q.spawn to ensure things happen in correct order

var createExpress = function() {
  winston.info("Creating express.");
  
  var app = express();
  
  app.use(errorHandler({
    dumpExceptions: true,
    showStack: true
  }));
  
  //[1]
  app.use(bodyParser.json());

  return app;
};

var configureResourced = function(app) {
  //[2]
  return resourced.configureResourcesInDirectory(__dirname + '/resources', app);
};

var startExpress = function(app) {
  winston.info("Express is now starting.");
  
  var port = process.env.PORT || 3050;

  //[3]
  winston.info("Routes: " +  inspect(app.router._routes)

  return app.listen(port, function() {
    winston.info("Express server listening on port " + port + " in " + app.settings.env + " mode.");

    return winston.info("Please go to 'http://localhost:" + port + "/people/0' to start your exciting journey.");
  });
};

var configureLogging = function() {
    return winston.handleExceptions();
  };

var setupAndRunServer = function() {
  //[3]
  Q.spawn(function * () {
    configureLogging();

    var app = createExpress();

    yield * configureResourced(app);

    startExpress(app);
  });
}

setupAndRunServer();