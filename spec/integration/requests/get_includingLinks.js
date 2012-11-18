var request = require('testresources'), 
    express = require('express'),
    testUtil = require('./../testUtil');

// NOTE - Uses personResource
describe.skip('when you make a GET request to resource where representation contains link to resource with multiple GET methods', function(){
    beforeEach(require('./../registerTestResources'))

    it('should select which GET handler to use by looking for one which uses as many of the options as possible', function(done) {
    })
})