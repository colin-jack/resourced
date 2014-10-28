var setupLogging = function () {
    var winston = require('winston');
    winston.cli();
    //winston.info("Switching to only logging errors (testFixture.js).")
    //winston.level = 'error';
}

var setupGlobalVariables = function () {
    var requireNamespace = require('require-namespace');
    requireNamespace.createSync(__dirname + "/", 'resourced');

    global.testLib = requireNamespace.createSync(__dirname + "/util", 'testLib');
    
    global.assert = require('chai').assert
}

var setupLongStackTraces = function () {
    // Might as well get long stack traces in tests.
    require('longjohn')
}

setupLogging();
setupGlobalVariables();
setupLongStackTraces();