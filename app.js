var koa = require('koa');
var route = require('koa-route');
var logger = require('koa-logger');
var parse = require('co-busboy');
var uuid = require('node-uuid');

var render = require('./lib/render');
var save = require('./lib/save');

var app = module.exports = koa();
var host = process.env.HOST || 'http://localhost:3000';
var port = process.env.PORT || 3000;

// Middleware

app.use(logger());

// Routes

app.use(route.get('/', function *() {
  this.body = yield render('index');
}));

app.use(route.post('/upload', function *() {
  var parts = parse(this, {
    autoFields: true
  });
  var id = uuid.v1();
  var part, image;

  while (part = yield parts) {
    image = yield save(id, part);
    break; // only process one image file
  }

  this.body = host + '/' + image.key;
}));

// Error handler

app.use(function *(next) {
  try {
    yield next;
  } catch (err) {
    this.throw(500, err.message);
  }
});

app.on('error', function (err) {
  console.error(err.stack);
});

// Run server

if (!module.parent) {
  app.listen(port, function () {
    console.log('app listening on port %d', port);
  });
}
