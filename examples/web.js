(function() {
  var async, bodyParser, configureLogging, configureResourced, createExpress, errorHandler, express, inspect, namespace, resourced, startExpress, winston;

  namespace = require('require-namespace');

  express = require('express');

  async = require('async');

  winston = require('winston');

  resourced = require('../index');

  inspect = require('util').inspect;

  require('longjohn');

  bodyParser = require('body-parser');

  errorHandler = require('errorhandler');

  createExpress = function() {
    winston.info("Creating express.");
    global.app = express();
    app.use(errorHandler({
      dumpExceptions: true,
      showStack: true
    }));
    return app.use(bodyParser());
  };

  configureResourced = function() {
    return resourced.configureResourcesInDirectory(__dirname + '/resources', global.app);
  };

  startExpress = function() {
    var port;
    winston.info("Express is now starting.");
    port = process.env.PORT || 3050;
    return app.listen(port, function() {
      winston.info("Express server listening on port " + port + " in " + app.settings.env + " mode.");
      return winston.info("Please go to 'http://localhost:" + port + "/people/0' to start your exciting journey.");
    });
  };

  configureLogging = function() {
    return winston.handleExceptions();
  };

  configureLogging();

  createExpress();

  configureResourced();

  startExpress();

}).call(this);

//# sourceMappingURL=web.js.map
