// Generated by CoffeeScript 1.3.3
(function() {
  var async, configureExpress, configureLogging, configureRestless, createExpress, express, namespace, processSeriesResult, restless, startExpress, winston;

  namespace = require('require-namespace');

  express = require('express');

  async = require('async');

  winston = require('winston');

  restless = require('../index');

  require('longjohn');

  createExpress = function(done) {
    winston.info("Creating express.");
    debugger;
    global.app = express();
    app.use(express.bodyParser());
    app.use(express.cookieParser());
    return done();
  };

  configureExpress = function(done) {
    winston.info("Configuring express.");
    app.configure('development', function() {
      return app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
      }));
    });
    return done();
  };

  startExpress = function(done) {
    var port;
    winston.info("Express is now starting.");
    port = process.env.PORT || 3050;
    return app.listen(port, function() {
      winston.info("Express server listening on port " + port + " in " + app.settings.env + " mode.");
      winston.info('Please go to "http://localhost:3050/people/5" to start your exciting journey.');
      return done();
    });
  };

  configureLogging = function(done) {
    winston.handleExceptions();
    return done();
  };

  configureRestless = function(done) {
    return restless.configureResourcesInDirectory(__dirname + '/resources', done);
  };

  processSeriesResult = function(err) {
    if (err) {
      return winston.error(err.toString());
    }
  };

  async.series([configureLogging, createExpress, configureExpress, configureRestless, startExpress], processSeriesResult);

}).call(this);
