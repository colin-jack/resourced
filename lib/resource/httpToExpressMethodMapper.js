var _u = require('underscore')

var httpToExpressMethodMapper = {
    getExpressMethodName: function(respondsToDefinition) {
        var handlerMethodName = _u.functions(respondsToDefinition)[0];
        var httpBehaviorDefinition = respondsToDefinition.http;
        
        var expressMethodName =  httpBehaviorDefinition && httpBehaviorDefinition.method ?
            this._deriveExpressMethodFromHttpMethod(httpBehaviorDefinition.method) :
            this._deriveExpressMethodFromHandlerMethod(handlerMethodName);

        // TODO: Error if expressMethodName absent
        
        return expressMethodName;
    },

    _deriveExpressMethodFromHttpMethod : function(httpMethod) {
        var mapping = _u.find(this.mappings, function(mapping) {
            return mapping.httpMethod === httpMethod.toLowerCase();
        });
    
        return mapping.expressMethod;
    },

    _deriveExpressMethodFromHandlerMethod : function(handlerMethodName) {
        var mapping = _u.find(this.mappings, function(mapping) {
            if (mapping.alternativeName && mapping.alternativeName == handlerMethodName){
                return true;
            }
            
            return mapping.httpMethod === handlerMethodName.toLowerCase();
        });
    
        // TODO: Error if nothing found
    
        return mapping.expressMethod;
    },
    
    mappings: [
        { httpMethod: 'put', expressMethod: 'put' },
        { httpMethod: 'get', expressMethod: 'get' },
        { httpMethod: 'post', expressMethod: 'post' },
        { httpMethod: 'delete', expressMethod: 'del', alternativeName: 'destroy' }
    ]
}

   

module.exports = httpToExpressMethodMapper;