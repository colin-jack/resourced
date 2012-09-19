namespace = require('require-namespace')
express = require('express')
invoke = require('invoke')
winston = require('winston')

createExpress = ->
  winston.info "Creating express."
  
  module.exports = global.app = express.createServer(
    express.cookieParser(),
    express.bodyParser(),
    express.session({ secret: 'A secretie valUe' })
  )

createExpress = (data, onComplete) ->
  invoke (data, done) ->
    createExpress()
    done()
  
  .end null, ->
      winston.info "Done creating express."
      onComplete()

configureExpress = (data, done) ->
  winston.info "Configuring express."

  # Basic configuration

  app.configureResources(__dirname + '/resources/')

  app.configure 'development', ->
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
    app.use(express.static(__dirname + '/public'));

  done()

startExpress = ->
  winston.info "Starting express."

  port = process.env.PORT || 3000;
  app.listen port, ->
    winston.info "Express server listening on port #{process.env.PORT} in #{app.settings.env} mode."

configureLogging = (data, done) ->
  winston.handleExceptions();
  done()

configureRestless = (data, done) ->
  require('../index')

  done()

invoke(configureLogging)
.then(createExpress)
.then(configureExpress)
.then(configureRestless)
.end(null, startExpress)