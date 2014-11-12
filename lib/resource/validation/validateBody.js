var _u = require('underscore'),
    rules = require('rules').rules;

var validateBody = function (request, response, handlerMethodDefinition) {
    debugger;
    if (!handlerMethodDefinition.schema) {
        return;
    }

    if (!request.body) {
        //require('util').log("***No body");    
        response.send({ message: "The request body must be provided."  });
        response.status(400);

        return false;
    }

    var toValidate = request.body;
    var schema = handlerMethodDefinition.schema;

    if (request.body) {
        var result = rules.apply(toValidate, schema);
        //require('util').log(require('util').inspect(result));    

        if (result) {
            response.status(400).send({
                message: "The request body was not valid.",
                details: result
            });

            return false;
        }
    }
}


module.exports = validateBody;