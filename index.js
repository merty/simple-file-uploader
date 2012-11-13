var server = require('./server');
var handlers = require('./handlers');
var router = require('./router');

var handle = {}
handle["/"] = handlers.home;
handle["/home"] = handlers.home;
handle["/upload"] = handlers.upload;
handle["_static"] = handlers.serveStatic;

server.start(router.route, handle);