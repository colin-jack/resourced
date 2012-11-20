var Resource = resourcedLib.require('Resource');

describe('errors specifying resource method', function() {
    describe('when the resource method definition has no verb specified and conventions do not cover it', function() {
        it("should throw an exception", function() {
            var invalidHandlerDefinition = {
                bob: function() { }
            };

            var resourceDefinition = createValidResourceDefinition();
            resourceDefinition.respondsTo.push(invalidHandlerDefinition);

            assert.throws(createResourceFunction(resourceDefinition), /Could not work out what http verb/);
        });
    });
    describe('when the collection resource method definition has no verb specified and conventions do not cover it', function() {
        it("should throw an exception")
    });

    describe('when the resource method definition has more than one function', function() {
        it("should throw an exception", function() {
            var invalidHandlerDefinition = {
                get: function() { },
                put: function() { }
            };

            var resourceDefinition = createValidResourceDefinition();
            resourceDefinition.respondsTo.push(invalidHandlerDefinition);

            assert.throws(createResourceFunction(resourceDefinition), /Each object in the responds to must contain one function./);
        });
    });

    describe('when the resource method definition has URL specified but its null', function() {
        it("should throw an exception", function() {
            var resourceDefinition = createValidResourceDefinition();
            resourceDefinition.url = null;

            assert.throws(createResourceFunction(resourceDefinition), /Please provide a URL/);
        });
    });

    describe('when the resource method definition has unexpected properties', function() {
        it("should throw an exception")
    });

    function createValidResourceDefinition() {
        return {
            url: "/people",
            respondsTo: [
                {
                    get: function() {
                    }
                }
            ]
        }
    }

    function createResourceFunction(resourceDefinition) {
        return function() {
            return Resource(resourceDefinition);
        }
    }
 });