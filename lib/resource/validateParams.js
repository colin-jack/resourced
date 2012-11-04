var _u = require('underscore'),
    rules = require('rules').rules;

var validateSingleValue = function(propertyName, argumentRules, toValidate) {
    var validator = argumentRules[propertyName];

    if (validator) {
        return rules.applyRule(validator, toValidate[propertyName], propertyName);        
    }
}

// If we have a validation rules object to apply then us it to validate request parameters and query string.
var validateParams = function(request, response, handlerMethodDefinition) {
    if (!handlerMethodDefinition.argumentRules) {
        return;
    }

    var toValidate = _u.defaults(request.params, request.query);
    var argumentRules = handlerMethodDefinition.argumentRules;

    var propertiesToValidate = Object.keys(toValidate);

    for(var i = 0, len = propertiesToValidate.length; i < len; i++) {
        var propertyName = propertiesToValidate[i];
        var result = validateSingleValue(propertyName, argumentRules, toValidate);

        if (result) {
            //require('util').log("*************************" + require('util').inspect(result));    
            response.send({ 
                    message: result.message,
                    property: propertyName
                })

            response.status(400);
        }
    }
}


module.exports = validateParams;