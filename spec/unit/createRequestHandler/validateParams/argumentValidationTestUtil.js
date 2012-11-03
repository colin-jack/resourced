var mustBe = require('rules').mustBe;

var createHandlerDefinitionWithRules = function() {
    return {
            get: function(id) {
            },
            argumentRules: {
                id: mustBe().numeric()
            },
            bodyRules: {
                name: mustBe().populated().string()
            }
        };
}

module.exports = {
    createHandlerDefinitionWithRules : createHandlerDefinitionWithRules
}