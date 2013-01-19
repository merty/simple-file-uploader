var config = require('./config'),
    fs = require('fs');

function home(response, postData) {
    response.writeHead(200, {'Content-Type': 'text/html'});
    response.end(fs.readFileSync('./static/index.html'));
}

function upload(response, postData) {
    
    var file                 = JSON.parse(postData),
        fileRootName         = file.name.split('.').shift(),
        fileExtension        = file.name.split('.').pop(),
        filePathBase         = config.upload_dir + '/',
        fileRootNameWithBase = filePathBase + fileRootName,
        filePath             = fileRootNameWithBase + '.' + fileExtension,
        fileID               = 2,
        fileBuffer;
    
    while (fs.existsSync(filePath)) {
        filePath = fileRootNameWithBase + '(' + fileID + ').' + fileExtension;
        fileID += 1;
    }
    
    file.contents = file.contents.split(',').pop();
    
    fileBuffer = new Buffer(file.contents, "base64");
    
    if (config.s3_enabled) {

        var knox = require('knox'),
            client = knox.createClient(config.s3),
            headers = {'Content-Type': file.type};
        
        client.putBuffer(fileBuffer, fileRootName, headers, function (err, res) {
            
            if (typeof res !== "undefined" && 200 === res.statusCode) {
                console.log('Uploaded to: %s', res.client._httpMessage.url);
                response.statusCode = 200;
            } else {
                console.log('Upload failed!');
                response.statusCode = 500;
            }
            
            response.end();
        });
        
    } else {
        fs.writeFileSync(filePath, fileBuffer);
        response.statusCode = 200;
        response.end();
    }
}

function serveStatic(response, pathname, postData) {

    var extension = pathname.split('.').pop(),
        extensionTypes = {
            'css' : 'text/css',
            'gif' : 'image/gif',
            'jpg' : 'image/jpeg',
            'jpeg': 'image/jpeg',
            'js'  : 'application/javascript',
            'png' : 'image/png'
        };
    
    response.writeHead(200, {'Content-Type': extensionTypes[extension]});
    response.end(fs.readFileSync('./static' + pathname));
}

exports.home = home;
exports.upload = upload;
exports.serveStatic = serveStatic;