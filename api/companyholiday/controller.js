'use strict';
var db = require('../../database/mysql/companyholiday');
var CompanyHoliday = require('./class');
var companyholiday = new CompanyHoliday();


// add company holiday to the table
exports.addcompanyholiday = function (req, res, next) {
	companyholiday.validatecompanyHolidayBody(req);
	var reqBodyResult = appFun.reqBodyValidation(req, res);
	if (reqBodyResult != null) return res.status(400).json({ status: false, message: "failed", result: reqBodyResult });


	db.getCompanyHolidayDate(req.body, function (err, result, obj) {

		if (err) {
			return res.status(400).json({ status: false, message: "failed", result: "something went wrong" });
		}
		else if (result.length !== 0) {
			return res.status(400).json({ status: false, message: "Requested date already at holiday", result: "Requested date already at holiday" });
		 }

		var obj = req.body;
		obj.employee_id = appFun.jwtDecord(req).eId;


		db.addcompanyholiday(req.body, function (err, result) {
			if (err) {
				return res.status(400).json({ status: false, message: "failed", result: "company holiday" });
			}
			return res.status(200).json({ status: true, message: "Success", result: "company holiday registered" });
		});

	});
};


// get all company holiday
exports.getAllCompanyHoliday = function (req, res, next) {

	db.getAllCompanyHoliday(function (err, result, obj) {
		if (err) {
			return res.status(400).json({ status: false, message: "failed", result: "somthing went wrong" });
		}
		return res.status(200).json({ status: true, message: "success", result: companyholiday.getAllCompanyHoliday(result) });

	})
};


// get all company holiday
exports.getAllCompanyHolidayById = function (req, res, next) {

	db.getAllCompanyHolidayById(req.query.id,function (err, result, obj) {
		if (err) {
			return res.status(400).json({ status: false, message: "failed", result: "something went wrong" });
		}
		return res.status(200).json({ status: true, message: "success", result: companyholiday.getAllCompanyHolidayById(result) });

	})
};


// get all company holiday
exports.getAllDateCompanyHoliday = function (req, res, next) {

	db.getAllDateCompanyHoliday(req.query.date,function (err, result, obj) {
		if (err) {
			return res.status(400).json({ status: false, message: "failed", result: "something went wrong" });
		}
		return res.status(200).json({ status: true, message: "success", result: companyholiday.getAllDateCompanyHoliday(result) });

	})
};


//view company Holiday
exports.viewCompanyHoliday = function (req, res, next) {

    db.viewCompanyHoliday(function (err, result, obj) {
        if (err) {
            return res.status(400).json({ status: false, message: "failed", result: "something went wrong" });
        }
        return res.status(200).json({ status: true, message: "success", result: companyholiday.viewCompanyHoliday(result) });

    })
};


// update company holiday
exports.updateHoliday = function (req, res, next) {

	db.updateHoliday(req.params.id, req.body, function (err, result, obj) {
		if (err) {
			return res.status(400).json({ status: false, message: "failed", result: "something went wrong" });
		}
		return res.status(200).json({ status: true, message: "success", result: companyholiday.updateHoliday(result)});
	})
};


// delete company holiday
exports.deleteHoliday = function (req, res, next) {

	db.deleteHoliday(req.params.id, function (err, result, obj) {
		if (err) {
			return res.status(400).json({ status: false, message: "failed", result: "something went wrong" });
		}
		return res.status(200).json({ status: true, message: "success", result: companyholiday.deleteHoliday(result) });

	})
};






