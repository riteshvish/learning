const express = require('express');
const app = express();
const path = require('path');
// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist'));

const forceSSL = function() {
  return function (req, res, next) {
    if (req.headers['x-forwarded-proto'] !== 'https') {
      return res.redirect(
       ['https://', req.get('Host'), req.url].join('')
      );
    }
    next();
  }
}
// Instruct the app
// to use the forceSSL
// middleware
app.use(forceSSL());


app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname + '/dist/index.html'));
})
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);

package.json

{
  "name": "rv-social",
  "version": "1.0.0",
  "description": "",
  "main": "app.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node app.js"
  },
  "engines": {
    "node": "6.11.0",
    "npm": "3.10.10"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.16.2",
    "path": "^0.12.7"
  }
}
