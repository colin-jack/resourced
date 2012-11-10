var mustBe = require('rules').mustBe;

var createWithNameIdRules = function() {
    var wasCalled = false;

    return {
            get: function(id) {
                wasCalled = true;
            },
            handlerWasCalled : function() {
                return wasCalled;
            },
            urlSchema: {
                id: mustBe().numeric(),
                name: mustBe().populated().string()
            },
            schema: {
                
            }
        };
}

var createWithIdBodyRules = function() {
    var wasCalled = false;
    
    return {
        get: function(id) {
            wasCalled = true;
        },
        handlerWasCalled : function() {
            return wasCalled;
        },
        urlSchema: {
            id: mustBe().numeric()
        },
        schema: {
            status: mustBe().populated().string(),
            age: mustBe().populated().numeric()
        }
    };
}

var createWithBodyRules = function() {
    var wasCalled = false;

    return {
        get: function(id) {
            wasCalled = true;
        },
        handlerWasCalled : function() {
            return wasCalled;
        },
        schema: {
            status: mustBe().populated().string(),
            age: mustBe().populated().numeric()
        }
    };
}

module.exports = {
    createWithNameIdRules: createWithNameIdRules,
    createWithIdBodyRules: createWithIdBodyRules,
    createWithBodyRules: createWithBodyRules
}