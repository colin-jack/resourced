namespace = require('require-namespace')
express = require('express')
async = require('async')
winston = require('winston')
resourced = require('../index')
inspect = require('util').inspect
require('longjohn') # Might as well get long stack traces as this is an example app

# TODO - Key aspects
# [1] Body parse is required
# [2] Call to configure resourced, it will scan the specified directory for resource files.
# [3] Uncomment if you want to see the routes being used

createExpress = (done) ->
  winston.info "Creating express."

  global.app = express()

  app.use(express.logger())

  app.configure 'development', ->
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

  # [1]
  app.use(express.bodyParser())
  
  done()

configureRestless = (done) ->
  # [2]
  resourced.configureResourcesInDirectory(__dirname + '/resources', done)

startExpress = (done) ->
  winston.info "Express is now starting."

  port = process.env.PORT || 3050;  

  #[3]
  #winston.info "Routes: " +  inspect(app.routes)

  app.listen port, ->
    winston.info "Express server listening on port #{port} in #{app.settings.env} mode."
    winston.info "Please go to 'http://localhost:#{port}/people/0' to start your exciting journey."

    done()

configureLogging = (done) ->
  winston.handleExceptions();
  done()

processSeriesResult = (err) ->
  if (err)
    winston.error err.toString()

async.series([configureLogging, createExpress, configureRestless, startExpress], processSeriesResult)