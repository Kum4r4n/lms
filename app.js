'use strict';
global.express = require('express');
var app = express();
var http = require('http');
var socket = require('socket.io');

process.env.NODE_ENV = process.env.NODE_ENV || 'development'; // check the envirment

global.config = require('./config/config'); //all the configurations
global.appFun = require('./app/app_function');
global.globalJs = require('./config/global'); // global variables
global.mail = require('./app/email/sendMail');

const server = http.Server(app);
const io = socket(server);

require('./middleware/express')(app); // all the rest api

// var enu = require('./api/enums/app.enum')?

server.listen(config.port, function () { // server running status
	console.info('server is running on ' + config.port);
});
