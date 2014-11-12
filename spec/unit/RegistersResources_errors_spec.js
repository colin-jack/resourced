var fixture = require('./unitTestFixture')
var assert = fixture.assert;
var RegistersResources = fixture.resourced.RegistersResources;
var Q = require('q');

describe('RegistersResources', function () {
    var thrownError = null;

    var catchError = function catchError(path, express, dependencyResolver) {
        return function (done) {
            thrownError = null;
            
            Q.spawn(function * () {
                try {
                    yield * RegistersResources.registerAllInDirectory(path, express, dependencyResolver)
                    done("Expected error but non occurred", null);
                }
                catch (e) {
                    thrownError = e;
                    done(null, thrownError);
                }
            });
        }
    }

    describe("invalid express instance provided", function () {
        describe("when given null express instance", function () {
            beforeEach(catchError("/util", null))

            it("should throw an exception", function () {
                assert.equal(thrownError.message, "You must provide the express instance to configure.")
            })
        });
        
        describe("when given undefined express instance", function () {
            beforeEach(catchError("/util", undefined))
            
            it("should throw an exception", function () {
                assert.equal(thrownError.message, "You must provide the express instance to configure.")
            })
        });
        
        describe("when given express instance with no use method", function () {
            beforeEach(catchError("/util", {}))
            
            it("should throw an exception", function () {
                assert.equal(thrownError.message, "You must provide the express instance to configure.")
            })
        });
    });
    
    describe("invalid directory path provided", function () {
        var MissingDirectoryPathMessage = "You must provide the directory path to scan.";

        var validFakeExpressInstance = { use: function () { } };
        
        describe("when given dummy express instance but null directory", function () {
            beforeEach(catchError(null, validFakeExpressInstance))
            
            it("should throw an exception", function () {
                assert.equal(thrownError.message, MissingDirectoryPathMessage)
            })
        });

        describe("when given dummy express instance but undefined directory", function () {
            beforeEach(catchError(undefined, validFakeExpressInstance))
            
            it("should throw an exception", function () {
                assert.equal(thrownError.message, MissingDirectoryPathMessage)
            })
        });

        describe("when given dummy express instance but non-string directory", function () {
            beforeEach(catchError(5, validFakeExpressInstance))
            
            it("should throw an exception", function () {
                assert.equal(thrownError.message, MissingDirectoryPathMessage)
            })
        });

        describe("when given dummy express instance but empty directory", function () {
            beforeEach(catchError("", validFakeExpressInstance))
            
            it("should throw an exception", function () {
                assert.equal(thrownError.message, MissingDirectoryPathMessage)
            })
        });

        describe("when given dummy express instance but directory path is to non-existent directory", function () {
            beforeEach(catchError("c:\\foo\\bar\\this\\is\\not\\going\\to\\exist", validFakeExpressInstance))
            
            it("should throw an exception", function () {
                assert.equal(thrownError.message, "The specified directory does not exist c:\\foo\\bar\\this\\is\\not\\going\\to\\exist.")
            })
        });
    });

    describe("invalid dependency resolver provided", function () {
        var ExpectedMessage = "If provided the dependencyResolver must have a resolve function.";
        
        var validFakeExpressInstance = { use: function () { } };

        describe("when given dependency resolver as non object", function () {
            beforeEach(catchError(__dirname, validFakeExpressInstance, 5))
            
            it("should throw an exception", function () {
                assert.equal(thrownError.message, ExpectedMessage)
            })
        });

        describe("when given dependency resolver has no resolve value", function () {
            beforeEach(catchError(__dirname, validFakeExpressInstance, { }))
            
            it("should throw an exception", function () {
                assert.equal(thrownError.message, ExpectedMessage)
            })
        });

        describe("when given dependency resolver has a resolve value but it is not a function", function () {
            beforeEach(catchError(__dirname, validFakeExpressInstance, { resolve: "bob" }))
            
            it("should throw an exception", function () {
                assert.equal(thrownError.message, ExpectedMessage)
            })
        });
    });
});