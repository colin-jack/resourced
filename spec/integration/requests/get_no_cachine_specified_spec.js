var resourceTest = require('testresources')
var fixture = require('./../integrationTestFixture')

var assert = fixture.assert;
var superAgent = require('superagent');

describe('when you test a get request and resource returns json which is not cacheable', function () {
   var request;
   var expectedBody;
   var expectedAddressBody;
    
   before(fixture.ensureSetup);
    
   beforeEach(function () {
       request = superAgent.get(fixture.server.fullUrl('/people/5'));
        
       expectedBody = {
           firstName : "Colin",
           secondName : "Jack",
           id : '5',
           address: "http://127.0.0.1:" + fixture.port + "/address/5"
       }
        
       expectedAddressBody = {
           "House Number": 72,
           "Stree Name": "Fox Lane",
           "Town": "Edinburgh",
           "PostCode": "EH99 7JJ"
       };
   });
    
   it('should respond with appropriate body', function () {
       return resourceTest(request)
                   .expectBody(expectedBody)
                   .expectNotCached()
                   .followLink("address")
                        .expectBody(expectedAddressBody)
                        .expectCachedForever("public")
                        .endLink()
                   .run(fixture.server);
   }); 
});