var winston = require('winston');
winston.cli();

// TODO - See https://github.com/flatiron/winston/pull/112
winston.info("Switching to only logging errors (testFixture.js).")
winston.level = 'error';

// sets up the namespace used by the test code, the namespace keeps the coupling related to directory structures
// under control so  we don't end up with paths like ../../../../lib/Resource
var testFixture = require('./../unit/testFixture');

// Althoug tests should try to register too we might as well kick off the registration immediately.
require('./registerTestResources')();