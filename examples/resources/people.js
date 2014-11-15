var resourced = require('../../index');
var Resource = resourced.Resource;
var http = resourced.http;
var cache = resourced.cache;
var ensure = require('rules').ensure;
var _u = require('underscore');

var personResource = require('./person');

var people = [
    { firstName: "bob", lastName: "smith", id : 1 },
    { firstName: "francis", lastName: "smith", id : 2 },
    { firstName: "bill", lastName: "bridge", id : 3 }
  ];

module.exports = new Resource({
    url: "/people",
    
    cache: cache.minutes(5).publically(),
    
    respondsTo: [
    http.get(function * (firstName, lastName) {
        var self = this;

        ensure(firstName).string();
        ensure(lastName).string();
        
        var searchTerms = {};
        if (firstName !== undefined) searchTerms.firstName = firstName;
        if (lastName !== undefined) searchTerms.lastName = lastName;
        
        var matching = _u.where(people, searchTerms);
        
        //debugger;
        
        var withUrls = matching.map(function (person) {
            debugger;
            person.self = self.urlFor(personResource, person);
            return person;
        });
        
        return matching;
    })
  ]
});