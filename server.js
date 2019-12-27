global.express = require('express')
var https = require('https');
var app = express();
var port = process.env.PORT || 8081;

process.env.NODE_ENV = process.env.NODE_ENV || 'development'; // check the environment


global.config = require('./config/config'); //all the configurations
global.appFun = require('./app/app_function');
global.globalJs = require('./config/global'); // global variables
global.mail = require('./app/email/sendMail');

require('./middleware/express')(app); //

app.listen(port, function() {
	console.log('app running ', port)
});
