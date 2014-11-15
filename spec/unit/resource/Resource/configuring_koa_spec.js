var sinon = require('sinon');

var fixture = require('./../../unitTestFixture')
var assert = fixture.assert;
var resourceObjectMother = fixture.testLib.resourceObjectMother;
var koaConfigurationSpyingHelper = fixture.testLib.koaConfigurationSpyingHelper;

describe('resource with single get method', function() {
    describe('when you use a get-only resource to configure a stubbed express', function() {
        var koaSpy;
        
        beforeEach(function () {
            var resource = resourceObjectMother.createGetOnlyResource();
            koaSpy = koaConfigurationSpyingHelper("get");

            resource.configure(koaSpy.stubKoa);
        });

        it('should not get an error', function() {
            assert.isFalse(koaSpy instanceof Error, koaSpy.toString());
        });

        it('should notify express of the new GET method', function() {
            koaSpy.assertCalledOnce();
        });

        it('should use correct URL when configuring express', function() {
            koaSpy.assertUrlRegistered("/things/:third/:first/:second");
        })
    });
});