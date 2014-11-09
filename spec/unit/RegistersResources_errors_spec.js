var fixture = require('./../unitTestFixture')
var assert = fixture.assert;
var RegistersResources = fixture.resourced.RegistersResources;
var Q = require('q');

describe('RegistersResources', function () {
    var thrownError = null;

    var catchError = function catchError(path, express) {
        return function (done) {
            thrownError = null;
            
            Q.spawn(function * () {
                try {
                    yield * RegistersResources.registerAllInDirectory(path, express)
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

            it("should raise an exception", function () {
                assert.equal(thrownError.message, "You must provide the express instance to configure.")
            })
        });
        
        describe("when given undefined express instance", function () {
            beforeEach(catchError("/util", undefined))
            
            it("should raise an exception", function () {
                assert.equal(thrownError.message, "You must provide the express instance to configure.")
            })
        });
        
        describe("when given express instance with no use method", function () {
            beforeEach(catchError("/util", {}))
            
            it("should raise an exception", function () {
                assert.equal(thrownError.message, "You must provide the express instance to configure.")
            })
        });
    });
    
    describe("invalid directory path provided", function () {
        var MissingDirectoryPathMessage = "You must provide the directory path to scan.";

        var validFakeExpressInstance = { use: function () { } };
        
        describe("when given dummy express instance but null directory", function () {
            beforeEach(catchError(null, validFakeExpressInstance))
            
            it("should raise an exception", function () {
                assert.equal(thrownError.message, MissingDirectoryPathMessage)
            })
        });

        describe("when given dummy express instance but undefined directory", function () {
            beforeEach(catchError(undefined, validFakeExpressInstance))
            
            it("should raise an exception", function () {
                assert.equal(thrownError.message, MissingDirectoryPathMessage)
            })
        });

        describe("when given dummy express instance but non-string directory", function () {
            beforeEach(catchError(5, validFakeExpressInstance))
            
            it("should raise an exception", function () {
                assert.equal(thrownError.message, MissingDirectoryPathMessage)
            })
        });

        describe("when given dummy express instance but empty directory", function () {
            beforeEach(catchError("", validFakeExpressInstance))
            
            it("should raise an exception", function () {
                assert.equal(thrownError.message, MissingDirectoryPathMessage)
            })
        });

        describe("when given dummy express instance but directory path is to non-existent directory", function () {
            beforeEach(catchError("c:\\foo\\bar\\this\\is\\not\\going\\to\\exist", validFakeExpressInstance))
            
            it("should raise an exception", function () {
                assert.equal(thrownError.message, "The specified directory does not exist c:\\foo\\bar\\this\\is\\not\\going\\to\\exist.")
            })
        });
    });
});