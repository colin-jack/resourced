// sets up the namespace used by the test code, the namespace keeps the coupling related to directory structures
// under control so  we don't end up with paths like ../../../../lib/Resource
var testFixture = require('./../unit/testFixture');

// TODO: Get this working.
var winston = require('winston');
var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({ level: 'error' }),
    ]
});

// Althoug tests should try to register too we might as well kick off the registration immediately.
require('./registerTestResources')();