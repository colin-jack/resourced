var koa = require('koa');
var app = koa();

// x-response-time

app.use(function *(next) {
    var start = new Date;
    yield next;
    var ms = new Date- start;
    this.set('X-Response-Time', ms + 'ms');
});

// logger

app.use(function *(next) {
    var start = new Date;
    yield next;
    var ms = new Date- start;
    console.log('%s %s - %s', this.method, this.url, ms);
});


// args

var f = function *(first, second) {
    console.log("here: " + first + ", " + second);
    this.body = first + ", " + second;
};

app.use(function *(next) {
    var start = new Date;
    var toCall = function * () {
        debugger;
        yield * f("bob", 1);
    };
    var gen = toCall();
    yield gen;
    var ms = new Date - start;
    console.log('%s %s - %s', this.method, this.url, ms);
});

// response

//app.use(function *(first, second) {
//    console.log("here: " + first + ", " + second);
//    this.body = first + ", " + second;
//});

app.listen(3000);