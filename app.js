var koa = require('koa');
var render = require('./lib/render');

var app = module.exports = koa();
var port = process.env.PORT || 3000;

// Middleware

// Routes

app.use(function *() {
  this.body = yield render('index');
});

// Error handler

app.use(function *(next) {
  try {
    yield next();
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
    console.log('app running on %d', port);
  });
}
