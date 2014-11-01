var Mocha = require('mocha'),
    fs = require('fs'),
    path = require('path');

// First, you need to instantiate a Mocha instance.
var mocha = new Mocha({
                bail: true,
                timeout: false
            });

// Then, you need to use the method "addFile" on the mocha
// object for each file.

var testDirectory = __dirname + "/validation";

mocha.addFile("./spec/integration/integrationTestFixture.js");

// Here is an example:
fs.readdirSync(testDirectory).filter(function (file) {
    // Only keep the .js files
    return  file.substr(-3) === '.js' && file.indexOf("getWithUrlSchema_spec") !== -1;
}).forEach(function (file) {
    // Use the method "addFile" to add the file to mocha
    mocha.addFile(path.join(testDirectory, file));
});

// Now, you can run the tests.
mocha.run(function (failures) {
    process.on('exit', function () {
        debugger;
        process.exit(failures);
    });
});