var assert = require('chai').assert;
var sinon = require('sinon');
var resourceObjectMother = testLib.require('resourceObjectMother');
var expressConfigurationSpy = testLib.require('expressConfigurationSpy');

describe('resource with single get method', function() {
    describe('when you use a get-only resource to configure a stubbed express', function() {
        var expressSpy;
        
        beforeEach(function() {
            var resource = resourceObjectMother.createGetOnlyResource();
            expressSpy = expressConfigurationSpy("get");

            resource.configureExpress(expressSpy.stubExpress);
        });

        it('should not get an error', function() {
            assert.isFalse(expressSpy instanceof Error, expressSpy.toString());
        });

        it('should notify express of the new GET method', function() {
            expressSpy.assertCalledOnce();
        });

        it('should use correct URL when configuring express', function() {
            expressSpy.assertUrlRegisteredWithIs("/things/:third/:first/:second");
        })
    });
});