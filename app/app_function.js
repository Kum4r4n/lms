/*common function here*/
var password_hash = require('password-hash');
var jwt = require('jsonwebtoken');
var crypto = require('crypto');

exports.isInt = function (n) {
	return Number(n) === n && n % 1 === 0;
};

exports.isFloat = function (n) {
	n = parseFloat(n);
	return Number(n) === n && n % 1 !== 0;
};

exports.isString = function (s) {
	if (s.length === 0) return false;
	return typeof s === 'string' || s instanceof String;
};

exports.getDate = getDate;

function getDate(dt) {

	var year = dt.getFullYear();
	var month = dt.getMonth() + 1;
	if (month <= 9) month = '0' + month;

	var day = dt.getDate();
	if (day <= 9) day = '0' + day;

	var prettyDate = year + '-' + month + '-' + day;
	return prettyDate;

}

exports.getTime = getTime;

function getTime(dt) {
	var h = (dt.getHours() < 10 ? '0' : '') + dt.getHours(),
		m = (dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes(),
		s = (dt.getSeconds < 10 ? '0' : '') + dt.getSeconds();
	return h + ':' + m + ':' + s;
}


exports.getDateTime = function (dt) {
	var date = new Date(dt);
	return getDate(date) + " " + getTime(date);
};

exports.isObject = function (a) {
	return (!!a) && (a.constructor === Object);
};

exports.isArray = function (a) {
	return (!!a) && (a.constructor === Array);
};

exports.contentType = function (req) {
	if (req.get('Content-Type') === 'application/json') return 'json';
	else return 'others';
};


exports.getTimeDiff = function (start, end, message) {
	var seconds = (end.getTime() - start.getTime()) / 1000;
	console.info("--" + message + "---", seconds);
};

exports.reqBodyValidation = function (req) { // request body full validation here
	var errors = req.validationErrors();
	if (appFun.contentType(req) !== 'json') {
		return 'Content type must be json';
	}
	if (errors) {
		return errors;
	}
	return null;
};

exports.trimAndLovercase = function (str) {
	return str.toLowerCase().trim();
};

exports.encryptPassword = function (str) {
	return password_hash.generate(str);
};

exports.passwordVerify = function (pw, db_pw) {
	return password_hash.verify(pw, db_pw);
};

exports.jwtToken = function (user) {
	return jwt.sign({
			uId: user.id,
			eId:user.employee_id,
			role_id:user.role_id,
			verify: appFun.encriptString(user.browser) + '.' + appFun.encriptString(user.ip)
		},
		globalJs.jwt.secret, {
			expiresIn: globalJs.jwt.expiresIn
		});
};

exports.verifyToken = function (req, cb) {
	var st = new Date();
	var token = req.headers.token !== undefined ? req.headers.token : '';
	jwt.verify(req.headers.token, globalJs.jwt.secret, function (err, decoded) {
		if (err) return cb(true, err.message)
		return cb(false, decoded)
	});
};

exports.jwtDecord = function (req) {
	var st = new Date();
	var token = req.headers.token !== undefined ? req.headers.token : '';
	var decoded = jwt.verify(token, globalJs.jwt.secret);
	return decoded;
};

exports.encriptString = function (str) {
	const hmac = crypto.createHmac('sha256', str);
	return hmac.digest('hex');
};

exports.findUseragent = function (req) {
	var obj = {};
	obj.browser = req.useragent.browser;
	obj.browserVersion = req.useragent.version;
	obj.ip = req.ip;
	obj.location = '';
	return obj;
};

exports.dateNow = function () {
	var dateNow = new Date();
	return dateNow;
};

exports.addHours = function (h) {
	var dt = new Date();
	dt.setHours(dt.getHours() + h);
	return getDate(dt) + " " + getTime(dt);
};

exports.addDays = function (day) {
	var d = new Date();
	d.setDate(d.getDate() + day);
	return getDate(d) + " " + getTime(d);
};

exports.spiltStringAsArray = function (obj , key){
	var array = [];
	obj.forEach(element => {
		var filter1 = element[key].replace('(' , '');
		var filter2 = filter1.replace(')' , '');
		var object = filter2.split(",");
		array.push(object);
	});
	return array;
};

exports.genarateRandoString = function(length) {
	var result           = '';
	var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	var charactersLength = characters.length;
	for ( var i = 0; i < length; i++ ) {
	   result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
 };
