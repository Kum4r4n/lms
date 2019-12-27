'use strict';
global.express = require('express');
var app = express();

// app.set("view options", {layout: false});
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.render('index.html');
});
app.get('*',function(req, res) {
    res.render('index.html');
});

// var enu = require('./api/enums/app.enum')?

app.listen(3000, function () { // server running status
	console.info('server is running on ' + 3000);
});