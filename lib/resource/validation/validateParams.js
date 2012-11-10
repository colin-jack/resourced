var _u = require('underscore'),
    rules = require('rules').rules;

var validateSingleValue = function(propertyName, urlSchema, toValidate) {
    var validator = urlSchema[propertyName];

    if (validator) {
        return rules.applyRule(validator, toValidate[propertyName], propertyName);        
    }
}

// If we have a validation rules object to apply then us it to validate request parameters and query string.
var validateParams = function(request, response, handlerMethodDefinition) {
    if (!handlerMethodDefinition.urlSchema) {
        return;
    }

    var toValidate = _u.defaults(request.params, request.query);
    var urlSchema = handlerMethodDefinition.urlSchema;

    var propertiesToValidate = Object.keys(toValidate);

    for(var i = 0, len = propertiesToValidate.length; i < len; i++) {
        var propertyName = propertiesToValidate[i];
        var result = validateSingleValue(propertyName, urlSchema, toValidate);

        if (result) {
            //require('util').log("*************************" + require('util').inspect(result));    
            response.send(400, { 
                    message: result.message,
                    property: propertyName
                });

            return false;
        }
    }

    return true;
}


module.exports = validateParams;