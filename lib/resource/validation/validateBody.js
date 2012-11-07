var _u = require('underscore'),
    rules = require('rules').rules;

var validateBody = function(request, response, handlerMethodDefinition) {
    if (!handlerMethodDefinition.bodyRules) {
        return;
    }

    if (!request.body) {
        //require('util').log("***No body");    
        response.send({ message: "The request body must be provided."  });
        response.status(400);

        return false;
    }

    var toValidate = request.body;
    var bodyRules = handlerMethodDefinition.bodyRules;

    if (request.body) {
        var result = rules.apply(toValidate, bodyRules);
        //require('util').log(require('util').inspect(result));    

        if (result) {
            response.send(400, { 
                    message: "The request body was not valid.",
                    details: result
                })

            return false;
        }
    }
}


module.exports = validateBody;