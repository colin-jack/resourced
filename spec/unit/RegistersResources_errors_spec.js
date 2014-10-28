var assert = require('chai').assert;
var resourced = require('require-namespace').resourced;
var RegistersResources = resourced.require('RegistersResources');

describe('RegistersResources', function () {
    describe("invalid express instance provided", function () {
        describe("when given null express instance", function () {
            it("should raise an exception", function () {
                assert.throws(function () {
                    RegistersResources.registerAllInDirectory("/util", null)
                }, /You must provide the express instance to configure./)
            })
        });
        
        describe("when given undefined express instance", function () {
            it("should raise an exception", function () {
                assert.throws(function () {
                    RegistersResources.registerAllInDirectory("/util", null)
                }, /You must provide the express instance to configure./)
            })
        });
        
        describe("when given express instance with no use method", function () {
            it("should raise an exception", function () {
                assert.throws(function () {
                    RegistersResources.registerAllInDirectory("/util", {})
                }, /You must provide the express instance to configure./)
            })
        });
    });
    
    describe("invalid directory path provided", function () {
        var validFakeExpressInstance = { use: function () { } };
        
        describe("when given dummy express instance but null directory", function () {
            it("should raise an exception", function () {
                assert.throws(function () {
                    RegistersResources.registerAllInDirectory(null, validFakeExpressInstance)
                }, /You must provide the directory path to scan./)
            })
        });

        describe("when given dummy express instance but undefined directory", function () {
            it("should raise an exception", function () {
                assert.throws(function () {
                    RegistersResources.registerAllInDirectory(undefined, validFakeExpressInstance)
                }, /You must provide the directory path to scan./)
            })
        });

        describe("when given dummy express instance but non-string directory", function () {
            it("should raise an exception", function () {
                assert.throws(function () {
                    RegistersResources.registerAllInDirectory(5, validFakeExpressInstance)
                }, /You must provide the directory path to scan./)
            })
        });

        describe("when given dummy express instance but empty directory", function () {
            it("should raise an exception", function () {
                assert.throws(function () {
                    RegistersResources.registerAllInDirectory("", validFakeExpressInstance)
                }, /You must provide the directory path to scan./)
            })
        });

        describe("when given dummy express instance but directory path is to non-existent directory", function () {
            it("should raise an exception", function () {
                assert.throws(function () {
                    RegistersResources.registerAllInDirectory("c:\\foo\\bar\\this\\is\\not\\going\\to\\exist", validFakeExpressInstance)
                }, "The specified directory does not exist c:\\foo\\bar\\this\\is\\not\\going\\to\\exist")
            })
        });
    });
});