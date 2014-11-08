var resourceTest = require('testresources');
var testUtil = require('./../testUtil');
var registerTestResources = require('./../registerTestResources');

// NOTE - Uses personResource
describe('when you make a GET request to a method which is specifically over-riding http method', function (){
    var fixture = {};

    before(registerTestResources(fixture))

    it('should respond with appropriate body', function(done) {
        var expectedBody = {
                    firstName : "Colin",
                    secondName : "Jack",
                    id : '5',
                    address: "http://127.0.0.1:" + resourceTest.port + "/address/5"
        }
        
        var expectedAddressBody = {
            "House Number": 72,
            "Stree Name": "Fox Lane",
            "Town": "Edinburgh",
            "PostCode": "EH99 7JJ"
        };
        
        debugger;
        
        resourceTest(fixture.expressApp)
            .get('/people/5')
            .expectBody(expectedBody)
            .expectNotCached()
            .followLink("address")
                 .expectBody(expectedAddressBody)
                 .expectCachedForever("public")
                 .endLink()
            .run(done);
    })
})