var resourceTest = require('testresources'), 
    express = require('express'),
    testUtil = require('./../testUtil');

// NOTE - Uses personResource
describe('when you make a GET request to a method which is specifically over-riding http method', function(){
    beforeEach(require('./../registerTestResources'))

    // TODO - Use resourceTest.port
    it('should respond with appropriate body', function(done) {
        var expectedBody = {
                    firstName : "Colin",
                    secondName : "Jack",
                    id : '5',
                    address: "http://127.0.0.1:" + 3551 + "/address/5"
                }

        var expectedAddressBody = {
            "House Number": 72,
            "Stree Name": "Fox Lane",
            "Town": "Edinburgh",
            "PostCode": "EH99 7JJ"
        };

        resourceTest(app).get('/people/5')
            .expectBody(expectedBody)
            //.expectNotCached()
            .followLink("address")
                 .expectBody(expectedAddressBody)
            //     .expectCacheForever("publically")
                 .endLink()
            .run(done);
    })
})