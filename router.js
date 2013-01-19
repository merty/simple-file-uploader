function respondWithHTTPCode(response, code) {
	response.writeHead(code, {'Content-Type': 'text/plain'});
	response.end();
}

function route(handle, pathname, response, postData) {

	var extension = pathname.split('.').pop();

	if ('function' === typeof handle[pathname]) {
		handle[pathname](response, postData);
	} else if ('css' === extension || 'js' === extension) {
		handle._static(response, pathname, postData);
	} else {
		respondWithHTTPCode(response, 404);
	}
}

exports.route = route;