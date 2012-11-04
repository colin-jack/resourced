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
            argumentRules: {
                id: mustBe().numeric(),
                name: mustBe().populated().string()
            },
            bodyRules: {
                
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
        argumentRules: {
            id: mustBe().numeric()
        },
        bodyRules: {
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
        bodyRules: {
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