const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

//set up the http server
const app = express();
const server = http.Server(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//set up the main route for the backend server
app.use('/', require('./routes/index'));

app.set('port', 3000);

// Start server
server.listen(app.get('port'), function () {
    console.log('Starting server on port ' + app.get('port'));
});


module.exports = app;