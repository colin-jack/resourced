var resourceTest = require('testresources')
var fixture = require('./../integrationTestFixture')

var assert = fixture.assert;
var superAgent = require('superagent');

describe.skip('when you get from a resource and the method is being over-ridden', function () {
    //before(registerTestResources(fixture))

    //it('should respond with appropriate body', function(done) {
    //    var expectedBody = {
    //                firstName : "Colin",
    //                secondName : "Jack",
    //                id : '5',
    //                address: "http://127.0.0.1:" + resourceTest.port + "/address/5"
    //    }
        
    //    var expectedAddressBody = {
    //        "House Number": 72,
    //        "Stree Name": "Fox Lane",
    //        "Town": "Edinburgh",
    //        "PostCode": "EH99 7JJ"
    //    };
        
    //    debugger;
        
    //    resourceTest(fixture.koaApp)
    //        .get('/people/5')
    //        .expectBody(expectedBody)
    //        .expectNotCached()
    //        .followLink("address")
    //             .expectBody(expectedAddressBody)
    //             .expectCachedForever("public")
    //             .endLink()
    //        .run(done);
    //})
})
