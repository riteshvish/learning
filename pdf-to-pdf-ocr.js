//  "tesseract.js": "^2.0.0-alpha.9",
var Tesseract = require('tesseract.js')
const { TesseractWorker } = Tesseract;
const worker = new TesseractWorker();

worker
  .recognize(
    'https://hips.hearstapps.com/ghk.h-cdn.co/assets/18/02/martin-luther-king-jr-inspirational-quote.jpg',
    'eng',
    {
      'tessedit_create_pdf': '1',
      'pdf_name':'mypdf'
    }
  )
  .progress((p) => {
    console.log('progress', p);
  })
  .then((result) => {
    console.log(result); 
  });

note things are pending 
local file process (it should work with pdf)
file destination
"devDependencies": {
    "babel": "^6.23.0",
    "babel-cli": "^6.26.0",
    "babel-core": "^6.26.3",
    "babel-loader": "^8.0.4",
    "babel-polyfill": "^6.26.0",
    "babel-preset-env": "^1.7.0",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-stage-0": "^6.24.1"
  }
var Tesseract = require('tesseract.js')
const { TesseractWorker } = Tesseract;
const worker = new TesseractWorker();

// // NOTE: install imagemagick ghostscript
// var PDFImage = require("pdf-image").PDFImage;
// console.log("dasd");
// var pdfImage = new PDFImage("/Users/ritesh/Documents/ritesh/project/electron/mergepdf/pdf/1.pdf");
// pdfImage.convertFile().then(function (imagePaths) {
//   // [ /tmp/slide-0.png, /tmp/slide-1.png ]
//   console.log(imagePaths);
// }).catch(e=>{
//   console.log(e);
// });


worker
  .recognize(
    // '1.jpg',
    '/Users/ritesh/Documents/ritesh/project/electron/mergepdf/pdf/output-0.png',
    'eng',
    {
      'tessedit_create_pdf': '1',
      'pdf_name':'output-0',
      pdf_path:"/Users/ritesh/Documents/ritesh/project/electron/mergepdf/pdf/"
    }
  )
  .progress((p) => {
    console.log('progress', p);
  })
  .then((result) => {
    console.log(result);
  });
