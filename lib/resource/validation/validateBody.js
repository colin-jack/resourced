var _u = require('underscore'),
    rules = require('rules').rules;

var validateBody = function (context, handlerMethodDefinition) {
    //debugger;
    if (!handlerMethodDefinition.schema) {
        return;
    }
    
    var request = context.request;
    var response = context.response;

    if (!request.body) {
        //require('util').log("***No body");    
        response.body = { message: "The request body must be provided." };
        response.status = 400;

        return false;
    }

    var toValidate = request.body;
    var schema = handlerMethodDefinition.schema;

    if (request.body) {
        var result = rules.apply(toValidate, schema);
        //require('util').log(require('util').inspect(result));    

        if (result) {
            var errorBody = {
                message: "The request body was not valid.",
                details: result
            };

            response.body = errorBody;
            response.status = 400;

            return false;
        }
    }
}


module.exports = validateBody;