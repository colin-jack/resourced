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

var createWithIdBodyRulesButNoBodyArgument = function() {
    return {
            get: function(id) {
            },
            argumentRules: {
                id: mustBe().numeric()
            },
            bodyRules: {
                status: mustBe().populated().string()
            }
        };
}

module.exports = {
    createWithNameIdRules : createWithNameIdRules,
    createWithIdBodyRulesButNoBodyArgument: createWithIdBodyRulesButNoBodyArgument
}