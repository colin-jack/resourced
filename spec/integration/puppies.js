var request = require('supertest'), 
    express = require('express');

var app = express();

describe('When you GET /puppy/5', function(){
  it('should respond with appropriate json', function(done){
    request(app)
      .get('/puppy/5')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
  })
});