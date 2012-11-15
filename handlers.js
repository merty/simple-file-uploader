var config = require('./config');
var fs = require('fs');

function home(response, postData) {
	response.writeHead(200, {'Content-Type': 'text/html'});
	response.end( fs.readFileSync('./static/index.html') );
}

function upload(response, postData) {

	var file = JSON.parse(postData);

	var fileRootName = file.name.split('.').shift();
	var fileExtension = file.name.split('.').pop();
	var filePathBase = config.upload_dir + '/';

	var fileRootNameWithBase = filePathBase + fileRootName;
	var filePath = fileRootNameWithBase + '.' + fileExtension;

	var fileID = 2;

	while ( fs.existsSync(filePath) ) {
		filePath = fileRootNameWithBase + '(' + fileID + ').' + fileExtension;
		fileID++;
	}

	file.contents = file.contents.split(',').pop();
	
	var fileBuffer = new Buffer( file.contents, "base64" );
	
	if ( config.s3_enabled ) {
		var knox = require('knox');
		var client = knox.createClient(config.s3);
		var headers = {
			'Content-Type': file.type
		};
		client.putBuffer(fileBuffer, fileRootName, headers, function(err, res) {
			if ( ! (res === "undefined") && 200 == res.statusCode ) {
				console.log('Uploaded to: %s', res.client._httpMessage.url);
				response.writeHead(200, {'Content-Type': 'text/plain'});
				response.end('OK');
			} else {
				console.log('Upload failed!');
			}
		});
	} else {
		fs.writeFileSync( filePath, fileBuffer );
		response.writeHead(200, {'Content-Type': 'text/plain'});
		response.end('OK');
	}
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
