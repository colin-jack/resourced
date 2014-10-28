var winston = require('winston');
winston.cli();

// TODO - See https://github.com/flatiron/winston/pull/112
winston.info("Switching to only logging errors (testFixture.js).")
winston.level = 'error';

var setupLogging = function () {
    var winston = require('winston');
    winston.cli();
    //winston.info("Switching to only logging errors (testFixture.js).")
    //winston.level = 'error';
}

var setupGlobalVariables = function () {
    var requireNamespace = require('require-namespace');
    global.testLib = requireNamespace.createSync(__dirname + "/util", 'testLib');
    
    global.assert = require('chai').assert
}

var setupLongStackTraces = function () {
    // Might as well get long stack traces in tests.
    require('longjohn')
}

var registerResources = function () {
    require('./registerTestResources')();
}

setupLogging();
//setupGlobalVariables();
setupLongStackTraces();
registerResources