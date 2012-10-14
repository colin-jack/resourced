var assert = require('chai').assert,
             fixture = require('./../testFixture'),
             populateArgumentsFromRequest = fixture.require('populateArgumentsFromRequest');

var createRequest = function(params, query) {
    return {
        params: params,
        query: query
    };
}

var handlerMethod = function(id, name, from, to, friend, foe) {
}

var getHandlerArguments = function(params, query) {
    var request = createRequest(params, query);
    return populateArgumentsFromRequest(request, handlerMethod);
}

// TODO: Fill in.
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
    });

    describe('when you populate arguments from a request containing query and parameter values', function() {
    });
});