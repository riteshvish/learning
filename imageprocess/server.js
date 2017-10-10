// https://iamnotmyself.com/2013/06/19/the-worlds-simplest-dynamic-image-service/

var express = require('express'),
    request = require('request'),
    transform = require('./lib/image-transformer'),
    config  = require('./config'),
    app     = express(),
    server;

// app.get(/d\/(.+)/, function(req, res) {
app.get('/image', function(req, res) {
    console.log("ind ",req.query)
    // var url = config.get('images') + req.params[0];
    var url='http://imgsv.imaging.nikon.com/lineup/lens/zoom/normalzoom/af-s_dx_18-140mmf_35-56g_ed_vr/img/sample/sample1_l.jpg'
    request({ url: url })
        .on('response', function(image_stream) {
            transform(image_stream, { w: '100', h: '100'})
            .pipe(res);
        });
});

app.listen(config.get('port'), function(){
    console.log('server started on port ' + config.get('port'));
});
