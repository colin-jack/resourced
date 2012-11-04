var mustBe = require('rules').mustBe;

var createWithNameIdRules = function() {
    var wasCalled = false;

    return {
            get: function(id) {
                require('util').log("**** Called");
                wasCalled = true;
            },
            handlerWasCalled : function() {
                require('util').log("****Was called: " + wasCalled);
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
    return {
            get: function(id) {
                this.wasCalled = true;
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

module.exports = {
    createWithNameIdRules : createWithNameIdRules,
    createWithIdBodyRules: createWithIdBodyRules
}