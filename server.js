var config = require('./config');
var http = require('http');
var url = require('url');

function start(route, routes) {

  function onRequest(request, response) {

    var pathname = url.parse(request.url).pathname;
    var postData = '';

    request.setEncoding('utf8');

    request.addListener('data', function (postDataChunk) {
      postData += postDataChunk;
    });

    request.addListener('end', function () {
      route(routes, pathname, response, postData);
    });
  }

  http.createServer(onRequest).listen(config.port);
  console.log('Started HTTP server on port ' + config.port + '...');
}

module.exports = {
  start: start
};
