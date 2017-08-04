// This file works independent of webpac-dev-server and is used with "npm build" to simulate a server build
// plus we're directing the host (e.g. Heroku) to run this file as the server configuration using Procfile

const express = require('express');
const app = express();

// process.env.PORT useful in production/server environment (as it is dictated by the server),
// otherwise default to port 3000. Used below in app.listen.
const PORT = process.env.PORT || 3000;

// Serve files from the public folder where bundle and index live
app.use(express.static(__dirname + '/public'));

app.listen(PORT, function() {
  console.log('App running on localhost at port: ' + PORT);
});
