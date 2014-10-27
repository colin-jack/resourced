(function() {
  var Resource, caching, ensure, http, people;

  Resource = require('../../lib/resource/Resource');

  http = require('../../lib/resource/http');

  caching = require('../../lib/caching/cache');

  ensure = require('rules').ensure;

  people = [
    {
      firstName: "bob",
      lastName: "smith"
    }, {
      firstName: "francis",
      lastName: "smith"
    }, {
      firstName: "bill",
      lastName: "bridge"
    }, {
      firstName: "edgar",
      lastName: "jones"
    }, {
      firstName: "lily",
      lastName: "wright"
    }, {
      firstName: "mike",
      lastName: "terry"
    }, {
      firstName: "sarah",
      lastName: "connors"
    }, {
      firstName: "dorothy",
      lastName: "fibbers"
    }
  ];

  module.exports = new Resource({
    url: "/people",
    cache: caching.minutes(5).publically(),
    respondsTo: [
      http.get(function(from, to) {
        ensure(from).populated().numeric({
          greaterThanOrEqualTo: 0
        });
        ensure(to).populated().numeric({
          greaterThan: from,
          message: "The from value must be less than the to value."
        });
        return require('util').log("From: " + from);
      })
    ]
  });

}).call(this);

//# sourceMappingURL=people.js.map
