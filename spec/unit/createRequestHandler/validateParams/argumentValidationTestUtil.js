var mustBe = require('rules').mustBe;

var createHandlerDefinitionWithRules = function() {
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

module.exports = {
    createHandlerDefinitionWithRules : createHandlerDefinitionWithRules
}