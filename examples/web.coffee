namespace = require('require-namespace')
express = require('express')
async = require('async')
winston = require('winston')
restless = require('../index')

createExpress = (done) ->
  winston.info "Creating express."

  global.app = express(
    express.cookieParser(),
    express.bodyParser(),
  )
  
  done()

configureExpress = (done) ->
  winston.info "Configuring express."

  app.configure 'development', ->
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

  done()

startExpress = (done) ->
  winston.info "Express is now starting."

  port = process.env.PORT || 3050;

  app.listen port, ->
    winston.info "Express server listening on port #{port} in #{app.settings.env} mode."
    winston.info "Please go to http://localhost:3050/things/3/1/2."
    done()

configureLogging = (done) ->
  winston.handleExceptions();
  done()

configureRestless = (done) ->
  restless.configureResourcesInDirectory(__dirname + '/resources', done)

processSeriesResult = (err) ->
  if (err)
    winston.error err.toString()

async.series([configureLogging, createExpress, configureExpress, configureRestless, startExpress], processSeriesResult)