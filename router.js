function respondWithHTTPCode(response, code) {
  response.writeHead(code, {'Content-Type': 'text/plain'});
  response.end();
}

function route(routes, pathname, response, postData) {

  var extension = pathname.split('.').pop();

  if ( 'function' === typeof routes[pathname] ) {
    routes[pathname](response, postData);
  } else if ( 'css' === extension || 'js' === extension ) {
    routes._static(response, pathname, postData);
  } else {
    respondWithHTTPCode(response, 404);
  }
}

module.exports = {
  route: route
};
