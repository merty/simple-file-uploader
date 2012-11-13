var config = require('./config');
var fs = require('fs');

function home(response, postData) {
	response.writeHead(200, {'Content-Type': 'text/html'});
	response.end( fs.readFileSync('./static/index.html') );
}

function upload(response, postData) {

	var file = JSON.parse(postData);

	fileRootName = file.name.split('.').shift();
	fileExtension = file.name.split('.').pop();
	filePathBase = config.upload_dir + '/';

	fileRootName = filePathBase + fileRootName;
	filePath = fileRootName + '.' + fileExtension;

	fileID = 2;

	while ( fs.existsSync(filePath) ) {
		filePath = fileRootName + '(' + fileID + ').' + fileExtension;
		fileID++;
	}

	file.contents = file.contents.split(',').pop();
	fs.writeFileSync( filePath, new Buffer( file.contents, "base64" ) );

	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end('OK');
}

function serveStatic(response, pathname, postData) {

	var extension = pathname.split('.').pop();
	var extensionTypes = {
		'css' : 'text/css',
		'gif' : 'image/gif',
		'jpg' : 'image/jpeg',
		'jpeg': 'image/jpeg',
		'js'  : 'application/javascript',
		'png' : 'image/png'
	};

	response.writeHead(200, {'Content-Type': extensionTypes[extension]});
	response.end( fs.readFileSync('./static' + pathname) );
}

exports.home = home;
exports.upload = upload;
exports.serveStatic = serveStatic;