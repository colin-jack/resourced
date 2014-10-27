namespace = require('require-namespace')
express = require('express')
async = require('async')
winston = require('winston')
resourced = require('../index')
inspect = require('util').inspect
require('longjohn') # Might as well get long stack traces as this is an example app
bodyParser = require('body-parser')
errorHandler = require('errorhandler')

# TODO - Key aspects
# [1] Body parse is required
# [2] Call to configure resourced, it will scan the specified directory for resource files.
# [3] Uncomment if you want to see the routes being used
# [4] Create a namespace so we can access parts of resourced API directly

createExpress = () ->
  winston.info "Creating express."

  global.app = express()

  app.use(errorHandler({ dumpExceptions: true, showStack: true }));

  # [1]
  app.use(bodyParser())

configureResourced = () ->
  # [2]
  resourced.configureResourcesInDirectory(__dirname + '/resources', global.app)

startExpress = () ->
  winston.info "Express is now starting."

  port = process.env.PORT || 3050;  

  #[3]
  #winston.info "Routes: " +  inspect(app.routes)

  app.listen port, ->
    winston.info "Express server listening on port #{port} in #{app.settings.env} mode."
    winston.info "Please go to 'http://localhost:#{port}/people/0' to start your exciting journey."

configureLogging = () ->
  winston.handleExceptions();

configureLogging()
createExpress()
configureResourced()
startExpress()