//var resourced = require('require-namespace').resourced;
//var Resource = resourced.require('Resource');
//var http = resourced.require('http');
//var cache = resourced.require('cache');

//var ensureNumericId = require('./validation/ensureNumericId');
//var puppySchema = require('./validation/puppySchema');

//module.exports = new Resource({
//    url: "/puppies/:id",

//    //urlSchema: ensureNumericId,

//    respondsTo: [
//    {
//        get: function(id) {
//            return {
//                name: "spot",
//                id: id
//            };
//        }
//    }, 
//    {
//        put: function (id) { //, body
//            debugger;
//            res.status(200).end();
//            //res.send({ name: 'fido' });
//        },

//        //schema: puppySchema
//    }]
//});

var resourced = require('require-namespace').resourced;
var Resource = resourced.require('Resource');
var http = resourced.require('http');


module.exports = new Resource({
    url: "/puppies/:id",

    respondsTo: [
    {
        put: function (id) { //, body
            debugger;
            this.response.send({ name: 'fido' });
            //res.send({ name: 'fido' });
        },

        //schema: puppySchema
    }]
});