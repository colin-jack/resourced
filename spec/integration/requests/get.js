var request = require('testresources'), 
    express = require('express'),
    testUtil = require('./../testUtil');

describe('when you make a GET request to a method which is specifically over-riding http method', function(){
    beforeEach(require('./../registerTestResources'))

    it('should respond', function(done) {
        var expectedBody = {
                    firstName : "Colin",
                    secondName : "Jack",
                    id : '5',
                    address: {
                        rel: "address",
                        href: "/address/5"
                    }
                }

        request(app).get('/people/5')
            .expectBody(expectedBody)
            //.expectNotCached()
            // .followLink("address")
            //     .expectBody(...)
            //     .expectCacheForever("publically")
            //     .endLink()
            .run(done);
    })
})