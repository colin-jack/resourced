var superTest = require('supertest'), 
    underTest = require('testresources'), 
    express = require('express');

describe('GET /users', function(){
    var app,
        body = { name: "spot" };

    beforeEach(function() {
        // app = express();

        // app.get('/user', function(req, res){
        //   res.send(201, body);
        // });
    })

    it('respond with json', function() {
        underTest(global.app).get('/puppy/5').end();
    })
})