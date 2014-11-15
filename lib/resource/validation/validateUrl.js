var _u = require('underscore'),
    rules = require('rules').rules;

var validateSingleValue = function validateSingleValue(propertyName, urlSchema, toValidate) {
    var validator = urlSchema[propertyName];

    if (validator) {
        return rules.applyRule(validator, toValidate[propertyName], propertyName);        
    }
}

// If we have a validation rules object to apply then us it to validate request parameters and query string.
var validateUrl = function validateUrl(context, handlerMethodDefinition, resourceDefinition) {
    var urlSchema = handlerMethodDefinition.urlSchema || resourceDefinition.urlSchema;

    if (!urlSchema) {
        return;
    }
    
    debugger;

    var toValidate = _u.defaults(context.params, context.request.query);

    var propertiesToValidate = Object.keys(toValidate);

    for(var i = 0, len = propertiesToValidate.length; i < len; i++) {
        var propertyName = propertiesToValidate[i];
        var result = validateSingleValue(propertyName, urlSchema, toValidate);

        if (result) {
            debugger;
            var errorBody = {
                message: result.message,
                property: propertyName
            };

            context.response.status = 400;
            context.response.body = errorBody;

            return false;
        }
    }

    return true;
}


module.exports = validateUrl;