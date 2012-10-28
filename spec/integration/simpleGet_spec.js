var request = require('testresources'), 
    express = require('express');

describe('When you send get request to simple resource', function(){
    var body = { name: "spot" };

    beforeEach(function(done) {
        require('./registerTestResources')(done);
    })

    it('respond with json', function() {
        require('winston').info('****************** INSIDE TEST *****************')
        debugger;
        request(app).get('/puppy/5').expectBody(body).end();
    })
})