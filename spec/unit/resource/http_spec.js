var resourced = require('require-namespace').resourced;
var http = resourced.require('http');

describe('http', function() {
    describe("when you use 'http.put' to create an object describing a request handler", function() {
        assertCreatesHandler("put", http.put);
    });

    describe("when you use 'http.get' to create an object describing a request handler", function() {
        assertCreatesHandler("get", http.get);
    });

    describe("when you use 'http.destroy' to create an object describing a request handler", function() {
        assertCreatesHandler("destroy", http.destroy);
    });

    describe("when you use 'http.del' to create an object describing a request handler", function() {
        assertCreatesHandler("destroy", http.del);
    });

    describe("when you use 'http.post' to create an object describing a request handler", function() {
        assertCreatesHandler("post", http.post);
    });

    function assertCreatesHandler(expectedMethodName, underTest) {
        var created, handler, options;

        beforeEach(function() {  
            handler = function() { };
            options = { schema: {}, urlSchema: {}};

            created = underTest(handler, options);
        });

        it("should create an object with method called '" + expectedMethodName + "'", function() {
            assert.equal(created[expectedMethodName], handler)
        });

        it("should use options provided to populate the object", function() {
            assert.isDefined(created.schema);
            assert.isDefined(created.urlSchema)
        });
    }
});