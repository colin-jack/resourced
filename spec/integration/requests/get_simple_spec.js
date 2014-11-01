var assert = require('assert');
var resourceTest = require('testresources');
var registerTestResources = require('./../registerTestResources');

describe('Test Suite', function() {
    var fixture = {};
    
    before(registerTestResources(fixture))

    it('should respond with appropriate body', function (done) {
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
        
        resourceTest(fixture.expressApp).get('/people/5')
            .expectBody(expectedBody)
            .expectNotCached()
            .followLink("address")
                 .expectBody(expectedAddressBody)
                 .expectCachedForever("public")
                 .endLink()
            .run(done);
    })
})
