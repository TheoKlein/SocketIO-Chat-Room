var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});









http.listen(3000, function () {
    console.log('Server is now listening on port 3000');
});
