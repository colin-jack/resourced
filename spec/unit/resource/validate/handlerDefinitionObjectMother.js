var mustBe = require('rules').mustBe;

var statusAndAgeBodySchema = {
    status: mustBe().populated().string(),
    age: mustBe().populated().numeric()
};

var createBasicHandlerDefinitionSpy = function() {
    var wasCalled = false;

    return {
        get: function * (id) {
            wasCalled = true;
        },
        handlerWasCalled : function() {
            return wasCalled;
        }   
    };
}

var createWithNameIdRules = function() {
    var toReturn = Object.create(createBasicHandlerDefinitionSpy());
    toReturn.urlSchema =  {
        id: mustBe().numeric(),
        name: mustBe().populated().string()
    };
    return toReturn;
};

var createWithNoRules = function() {
    return createBasicHandlerDefinitionSpy();
};

var createWithIdBodyRules = function() {
    var toReturn = Object.create(createBasicHandlerDefinitionSpy());
    
    toReturn.urlSchema =  {
        id: mustBe().numeric(),
    };

    toReturn.schema = statusAndAgeBodySchema;

    return toReturn;
};

var createWithBodyRules = function() {
    var toReturn = Object.create(createBasicHandlerDefinitionSpy());
    toReturn.schema = statusAndAgeBodySchema;
    return toReturn;
};

module.exports = {
    createWithNameIdRules: createWithNameIdRules,
    createWithIdBodyRules: createWithIdBodyRules,
    createWithBodyRules: createWithBodyRules,
    createWithNoRules: createWithNoRules
}