var koa = require('koa');

var app = module.exports = koa();
var port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('app running on %d', port);
});
