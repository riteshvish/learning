var express = require('express'),
    app = express.createServer();

app.get('/', function(req, res){

  res.set('Content-Type', 'image/jpeg'); // set the header here

  gm('images/test.jpg')
    .resize(50,50)
    .stream(function (err, stdout, stderr) {
      stdout.pipe(res)
    });
});

app.listen(3000);
