var gm = require('gm').subClass({imageMagick: true})
var express = require('express');
var http=require('http')
app = http.createServer();

app.get('/', function(req, res, next){

gm('001_Fish-Wallpaper-HD.jpg')
    .resize(50,50)
    .stream(function streamOut (err, stdout, stderr) {
        if (err) return next(err);
        stdout.pipe(res); //pipe to response

        // the following line gave me an error compaining for already sent headers
        stdout.on('end', function(){
          res.writeHead(200, { 'Content-Type': 'ima    ge/jpeg' });
          res.end()
        });

        stdout.on('error', next);
});
});

app.listen(3000);


// var http = require('http')
//   , fs = require('fs');
//
// fs.readFile('001_Fish-Wallpaper-HD.jpg', function(err, data) {
//   if (err) throw err; // Fail if the file can't be read.
//   http.createServer(function(req, res) {
//     res.writeHead(200, {'Content-Type': 'image/jpeg'});
//     res.end(data); // Send the file data to the browser.
//   }).listen(8124);
//   console.log('Server running at http://localhost:8124/');
// });
//
// http://expressjs.com/en/api.html#res.sendFile
// https://stackoverflow.com/questions/17515699/node-express-sending-image-files-as-api-response
// https://stackoverflow.com/questions/12468471/nodejs-gm-resize-and-pipe-to-response?rq=1
