var http = require('http');
var url = require('url');
var fs = require('fs');
var gm = require('gm');
console.log("i am running");
var server = http.createServer(function(request, response){
  console.log("heres");
	var url_parts = url.parse(request.url).path.substring(1).split("/");

	var width = parseInt(url_parts[0]);
	var height = parseInt(url_parts[1]);
  var max = Math.max(width, height);
// console.log(width,height);
  width=50;
  height=75;
  console.log(width,height);
	if(!isNaN(width) && !isNaN(height))
	{
    response.writeHead(200, {'content-type': 'image/png'});
    gm('test.png').
    resize(max, max).
    crop(width, height, 0, 0).
    stream(function(err, stdout, stderr){
        if(err) {
            console.log(err)
        }
        else {
          console.log("heres 2");
          // console.log(response);
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
