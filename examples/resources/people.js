var resourced = require('../../index');
var Resource = resourced.Resource;
var http = resourced.http;
var cache = resourced.cache;
var ensure = require('rules').ensure;
var _u = require('underscore');

var people = [
    { firstName: "bob", lastName: "smith" },
    { firstName: "francis", lastName: "smith" },
    { firstName: "bill", lastName: "bridge" },
    { firstName: "edgar", lastName: "jones" },
    { firstName: "lily", lastName: "wright" },
    { firstName: "mike", lastName: "terry" },
    { firstName: "sarah", lastName: "connors" },
    { firstName: "dorothy", lastName: "fibbers" }
  ];

module.exports = new Resource({
    url: "/people",
    
    cache: cache.minutes(5).publically(),
    
    respondsTo: [
    http.get(function * (firstName, secondName) {
        
        debugger;
        ensure(from).populated().string();
        
        var matching = _u.where(people, { firstName: firstName, secondName: secondName });
        
        return matching;
    })
  ]
});