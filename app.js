var koa = require('koa');
var route = require('koa-route');
var logger = require('koa-logger');
var favicon = require('koa-favicon');
var parse = require('co-busboy');
var uuid = require('node-uuid');

var render = require('./lib/render');
var save = require('./lib/save');
var s3 = require('./lib/s3');
var exceptionHandler = require('./lib/exceptionHandler');

var app = module.exports = koa();
var port = process.env.PORT || 3000;
var host = process.env.HOST || ('http://localhost:' + port);

// Middleware

app.use(logger());
app.use(favicon());

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

app.use(route.get('/:id', function *(id) {
  var exists = yield s3.exists(id);
  if (exists) {
    var q = this.query;
    var commands = q._;

    this.body = yield render('show', {
      id: id,
      imageSrc: yield s3.getUrl(id),
      commands: commands ? commands.replace('"', '\"') : ''
    });
  } else {
    this.throw(404);
  }
}));

// Error handler

app.use(function *(next) {
  try {
    yield next;
  } catch (err) {
    this.status = 500;
    this.body = err.message;
    this.app.emit('error', err, this);
  }
});

app.on('error', function (err) {
  exceptionHandler(err);
});

// Run server

if (!module.parent) {
  app.listen(port, function () {
    console.log('app listening on port %d', port);
  });
}
