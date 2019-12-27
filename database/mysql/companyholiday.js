var db = require('./connection');
var moment = require('moment');


// add company holiday to the table
exports.addcompanyholiday = function (obj, cb) {
    var queryString = "INSERT INTO " +
        "company_holiday (" +
        "company_id," +
        "type_of_holiday_id," +
        "holiday_date," +
        "created_user," +
        "description) value (1," +
        " '" + obj.type_of_holiday_id + "', " +
        " '" + appFun.getDate(new Date(obj.holiday_date)) + "', " +
        " '" + obj.employee_id+"', " +
        " '" + obj.description + "')";
    db(queryString, null, obj, (err, result, cbData) => {
        if (err) return cb(true, result, cbData);

        return cb(false, result, cbData);

    });
};


// Get All Company Holiday
exports.getAllCompanyHoliday = function (cb) {
    var queryString = "select * from holiday_name ";

    db(queryString, null, null, (err, result, obj) => {
        if (err) return cb(true, err, obj);

        return cb(false, result, obj);

    });
};


// View Company Holiday
exports.viewCompanyHoliday = function (cb) {
    var queryString = "SELECT " +
        "company_holiday.id," +
        "company_holiday.type_of_holiday_id," +
        "company_holiday.description," +
        "company_holiday.holiday_date," +
        "holiday_name.type_of_holiday " +
        "FROM company_holiday " +
        "INNER JOIN holiday_name " +
        "ON company_holiday.type_of_holiday_id=holiday_name.id";

db(queryString, null, null, (err,result, obj) => {
    if (err) return cb(true, err, obj);
    return cb(false, result, obj);
    });
};


// get all company holiday based on type
exports.getAllCompanyHolidayById = function (id,cb) {
    var queryString = "select * from company_holiday";
    var conditiob = " where type_of_holiday_id ="+parseInt(id);
    queryString = parseInt(id)>0 ? queryString+conditiob : queryString;

    db(queryString, null, null, (err, result, obj) => {
        if (err) return cb(true, err, obj);

        return cb(false, result, obj);

    });
};


// get all company holiday based on date
exports.getAllDateCompanyHoliday = function (date,cb) {
    var queryString = "select * from company_holiday";
    var condition = " where year(holiday_date) ="+parseInt(date);
    queryString = parseInt(date)>2016 ? queryString+condition : queryString;

    db(queryString, null, null, (err, result, obj) => {
        if (err) return cb(true, err, obj);

        return cb(false, result, obj);

    });
};


// update company holiday
exports.updateHoliday = function (id,obj,cb) {
    var queryString = "UPDATE " +
        "company_holiday " +
        "SET type_of_holiday_id = '" + obj.type_of_holiday_id + "' , " +
        "description = '" + obj.description + "', " +
        "holiday_date = '" + appFun.getDate(new Date(obj.holiday_date)) + "' "+
        "WHERE id = '" + id + "' ";

    db(queryString, null, null, (err, result, obj) => {
        if (err) return cb(true, err, obj);

        return cb(false, result, obj);

    });
};


// delete company holiday
exports.deleteHoliday = function (id,cb) {
    var queryString =  "DELETE FROM company_holiday WHERE id = '" + id + "' ";

    db(queryString, null, null, (err, result, obj) => {
        if (err) return cb(true, err, obj);

        return cb(false, result, obj);

    });
};


// check the date of the holiday
exports.getCompanyHolidayDate = function (obj, cb) {
    var dateOfHoliday = moment(obj.holiday_date).format('YYYY-MM-DD');
    var queryString = "select * from company_holiday where holiday_date = '" + dateOfHoliday + "' ";
    db(queryString, null, obj, (err, result, obj) => {
        if (err) return cb(true, err, obj);
        return cb(false, result, obj);

    });
};
