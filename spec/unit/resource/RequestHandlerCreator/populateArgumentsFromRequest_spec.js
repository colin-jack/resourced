var fixture = require('./../../unitTestFixture')
var assert = fixture.assert;
var populateArgumentsFromRequest = fixture.resourced.require('populateArgumentsFromRequest');

describe('populating arguments from request', function() {
    describe('when you populate arguments from a request containing parameters for some values', function() {
        it('should populate appropriate arguments', function() {
            var params = {id : 5, name: 6, from: 5, to: 8, friend: true, foe: false};
            var handlerArguments = getHandlerArguments(params);

            assert.deepEqual(handlerArguments, [5, 6, 5, 8, true, false]);
        });
    });

     describe('when you populate arguments from a request containing parameters for all values', function() {
        it('should populate appropriate arguments', function() {
            var params = {id : 5, name: 6, foe: false};
            var handlerArguments = getHandlerArguments(params);

            assert.deepEqual(handlerArguments, [5, 6, undefined, undefined, undefined, false]);
        });
    });

    describe('when you populate arguments from a request containing only query values', function() {
         it('should populate appropriate arguments', function() {
            var query = { id : 5, name: 6 };
            debugger;
            var handlerArguments = getHandlerArguments([], query);

            assert.deepEqual(handlerArguments, [5, 6, undefined, undefined, undefined, undefined]);
        });
    });

    describe('when you populate arguments from a request containing query and parameter values', function() {
        it('should populate appropriate arguments giving precedence to values from params', function() {
            var params = {id : 5, name: 6};
            var query = {id: 89, foe: true}
            var handlerArguments = getHandlerArguments(params, query);

            assert.deepEqual(handlerArguments, [5, 6, undefined, undefined, undefined, true]);
        });
    });

    function createRequest(params, query) {
        return {
            params: params,
            query: query
        };
    }

    function handlerMethod(id, name, from, to, friend, foe) {
    }

    function getHandlerArguments(params, query) {
        var request = createRequest(params, query);
        // TODO: Pass in context
        debugger;
        return populateArgumentsFromRequest(request, null, handlerMethod);
    }
});