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
