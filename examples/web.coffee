namespace = require('require-namespace')
express = require('express')
async = require('async')
winston = require('winston')

createExpress = (done) ->
  winston.info "Creating express."

  global.app = express(
    express.cookieParser(),
    express.bodyParser(),
    express.session({ secret: 'A secretie valUe' })
  )
  
  done()

configureExpress = (done) ->
  winston.info "Configuring express."

  app.configure 'development', ->
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    app.use(express.static(__dirname + '/public'));

  done()

startExpress = (done) ->
  winston.info "Starting express."

  port = process.env.PORT || 3050;

  app.listen port, ->
    winston.info "Express server listening on port #{port} in #{app.settings.env} mode."
    done()

configureLogging = (done) ->
  winston.handleExceptions();
  done(null, null)

configureRestless = (done) ->
  winston.info "Configuring restless"
  #configureResourcesInDirectory = require('../index')

  done()

async.series([configureLogging, createExpress, configureExpress, configureRestless, startExpress])