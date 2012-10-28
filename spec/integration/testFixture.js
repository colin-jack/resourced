// sets up the namespace used by the test code, the namespace keeps the coupling related to directory structures
// under control so  we don't end up with paths like ../../../../lib/Resource
var testFixture = require('./../unit/testFixture');

require('./registerTestResources')();