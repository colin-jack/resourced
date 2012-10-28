var request = require('supertest'), 
    express = require('express');

describe('GET /users', function(){
    var app;

    beforeEach(function() {
        app = express();

        app.get('/user', function(req, res){
          res.send(200, { name: 'tobi' });
        });
    })

    it('respond with json', function(done){
        request(app)
            .get('/user')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    })
})