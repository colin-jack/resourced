var request = require('testresources'), 
    express = require('express');

describe('When you send get request to simple resource', function(){
    var body = { name: "spot" };

    beforeEach(require('./registerTestResources'))

    it('respond with expected json', function() {
        request(app).get('/puppies/5').expectBody(body).end();
    })
})