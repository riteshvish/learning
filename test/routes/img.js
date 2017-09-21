var http = require('http');
var url = require('url');
var fs = require('fs');
var gm = require('gm');

var server = http.createServer(function(request, response){
	var url_parts = url.parse(request.url).path.substring(1).split("/");

	var width = parseInt(url_parts[0]);
	var height = parseInt(url_parts[1]);
    var max = Math.max(width, height);

	if(!isNaN(width) && !isNaN(height))
	{
        response.writeHead(200, {'content-type': 'image/png'});
        console.warn("heres ");
        var readStream = fs.createReadStream('test.png');
        // gm(readStream)
        // .resize('200', '200')
        // .stream(function (err, stdout, stderr) {
        //   var writeStream = fs.createWriteStream('testnew.png');
        //   stdout.pipe(response);
        // });
        gm('test.png').
            resize(max, max).
            crop(width, height, 0, 0).
            stream(function(err, stdout, stderr){
                if(err) {
                    console.log(err)
                }
                else {
                    console.log(response)
                    stdout.pipe(response);
                }
            });
	}
    else {
        response.writeHead(400, {'content-type' : 'text/plain'});
        response.end();
    }
})
.listen(1337, '127.0.0.1');
