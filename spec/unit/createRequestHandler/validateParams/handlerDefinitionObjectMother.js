var mustBe = require('rules').mustBe;

var createWithNameIdRules = function() {
    return {
            get: function(id) {
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