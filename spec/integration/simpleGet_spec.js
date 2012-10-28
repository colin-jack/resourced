var superTest = require('supertest'), 
    underTest = require('testresources'), 
    express = require('express');

describe('GET /users', function(){
    var app,
        body = { name: 'tobi' };

    beforeEach(function() {
        app = express();

        app.get('/user', function(req, res){
          res.send(200, body);
        });
    })

    it('respond with json', function(){
        underTest(app).get('/user').expectBody(body)
    })
})