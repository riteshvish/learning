var express = require('express');
var router = express.Router();
var fs = require('fs')
  , gm = require('gm');
  var path = require('path');
  var url = require('url');
  var Jimp = require("jimp");
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


// router.get('/image', function(req, res, next){
router.get('/image', function(req, res, next){
console.log("called")
  Jimp.read("test.jpg", function (err, lenna) {
    console.log(err,lenna)
      if (err) {console.log(err); throw err;}
      lenna.resize(256, 256)            // resize
           .quality(60)                 // set JPEG quality
           .greyscale()                 // set greyscale
           .write("lena-small-bw.jpg"); // save
  });

})
//   var url_parts = url.parse(req.url, true);
//   var query = url_parts.query;
//   console.log(query,"q")
//     // gm('http://i.dailymail.co.uk/i/pix/2016/09/06/11/37F60FD200000578-0-image-a-5_1473156426673.jpg')
//     //     .resize(50,50)
//     //     .stream(function streamOut (err, stdout, stderr) {
//     //         if (err) {
//     //           console.log(err);
//     //           return next(err);
//     //         }
//     //         console.log("res");
//     //         stdout.pipe(res); //pipe to response
//     //
//     //         // the following line gave me an error compaining for already sent headers
//     //         // stdout.on('end', function(){
//     //         //   res.writeHead(200, { 'Content-Type': 'image/jpeg' });
//     //         // });
//     //
//     //         stdout.on('error', next);
//     // });
//
//     // res.sendFile('test.jpg')
//     // res.sendFile(path.join(__dirname + '/test.jpg'));
//   // var  newPath=path.join(__dirname + '/test.jpg');
//   // var  thumbPath=path.join(__dirname + '/testd.jpg');
//   // var  newPath=path.join(__dirname + '/test.jpg');
//   // // var thumbPath = __dirname + "/uploads/thumbs/" + imageName;
//   //           fs.writeFile(newPath, {}, function (err) {
//   //   gm(newPath)
//   //                 .resize(20, 20)
//   //                 .noProfile()
//   //                 .write(thumbPath, function (err) {
//   //                     if (!err) console.log('done');
//   //                     // res.redirect("/uploads/thumbs/"+imageName);
//   //                     res.sendFile(path.join(thumbPath));
//   //                 });
//   //               });
//
//   // gm('test.jpg')
//   // .resize('200', '200')
//   // .stream(function (err, stdout, stderr) {
//   //   var writeStream = fs.createWriteStream('testz.jpg');
//   //   // stdout.pipe(writeStream);
//   //   res.sendFile(path.join(__dirname + '/../testz.jpg'));
//   // });
//   var writeStream = fs.createWriteStream('test.jpg');
//   gm('test.jpg')
//     .resize(353, 257)
//     .autoOrient()
//     .write(writeStream, function (err) {
//       if (!err) console.log(' hooray! ');
//     });
//
// });

module.exports = router;
