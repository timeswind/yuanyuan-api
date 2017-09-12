var app = require('koa')();
// var raven = require('raven');
// var sentry = new raven.Client('https://b03d70e23cb849e1aa7c90f17fb9ace0:81af625093254b92b6e92bb8469e3818@sentry.io/101580');
var logger = require('koa-logger');
var bodyparser = require('koa-bodyparser');
var errorhandler = require('koa-errorhandler');
var compress = require('koa-compress')
var scheme = require('koa-scheme');
var checkToken = require('./middlewares/checkToken');
var internalPermissionCheck = require('./middlewares/internalPermissionCheck');
var router = require('koa-frouter');
var config = require('config-lite');
var core = require('./lib/core');
var jwt = require('koa-jwt');
// var chatSocket = require('./lib/chat/chat_socket.js');
var publicKey = require('fs').readFileSync(config.publicKeyName);

app.use(checkToken());

// app.on('error', function(err, context) {
//   sentry.captureException(err, context);
// });

app.use(jwt({ secret: publicKey, algorithm: 'RS256' }).unless({ path: [/^\/socket\.io/, /^\/public/] }));
app.use(internalPermissionCheck());
app.use(errorhandler());
app.use(bodyparser());
process.env.NODE_ENV !== 'production' && app.use(logger());
app.use(scheme(config.schemeConf));
app.use(compress())
app.use(router(app, config.routerConf));
app.use(function *(){
  this.body = 'Resource not found';
});


const server = app.listen(config.port, function () {
  console.log('Server listening on: ', config.port);
});

// chatSocket.start(server);
