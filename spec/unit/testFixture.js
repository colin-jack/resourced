var setupLogging = function () {
    var winston = require('winston');
    winston.cli();
    //winston.info("Switching to only logging errors (testFixture.js).")
    //winston.level = 'error';
}

var setupGlobalVariables = function () {
    // A namespace is used so that reorganising the folder containing the code under test doesn't result in 
    // lots of broken tests (avoids paths like ./../../../lib/Resource from tests)
    require('./../../lib/resourcedNamespace');

    var requireNamespace = require('require-namespace');
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