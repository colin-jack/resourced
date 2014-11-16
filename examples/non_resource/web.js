var koa = require('koa');
var bodyParser = require('koa-bodyparser');
var router = require('koa-router');
var logger = require('koa-logger')

var winston = require('winston');
var inspect = require('util').inspect;

var Q = require("Q");

var createApp = function () {
    winston.info("Creating app.");
    
    var app = koa();
    app.use(bodyParser());
    app.use(router(app));
    
    var people = [
        { firstName: "bob", lastName: "smith", id : 1, "job": "tinker", addressId: 3 },
        { firstName: "francis", lastName: "smith", id : 2, "job": "tailor", addressId: 2 },
        { firstName: "bill", lastName: "bridge", id : 3, "job": "soldier", addressId: 1 }
    ];
    
    app.get('/person/:id', function * () {
        var id = Number(this.params.id);
        if (id < 0) throw new Error("Id must greater than 0");

        var person = people[id];
        person.address = "http://...";
        
        this.response.body = person;
    });
    
    return app;
};

var startListening = function (app) {
    winston.info("Web server is now starting.");
    
    var port = process.env.PORT || 3050;
    
    return app.listen(port, function () {
        winston.info("Web server listening on port " + port + " in " + app.env + " mode.");
        
        // loadtest -c 50 --rps 2000 http://localhost:3050/person/2
        return winston.info("You can use loadtest to compare performnace of this versus 'person.js' in the resources directory. Url is http://localhost:" + port + "/person/2'.");
    });
};

var configureLogging = function () {
    return winston.handleExceptions();
};

var setupAndRunServer = function () {
    Q.spawn(function * () {
        configureLogging();
        
        var app = createApp();
        
        startListening(app);
    });
}

setupAndRunServer();