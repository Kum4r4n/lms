var db = require('./connection');


// Add Employee
exports.add = function (obj, cb) {

    var queryString = "INSERT INTO employee (employee_number," +
        "first_name," +
        "last_name," +
        "email," +
        "nic_no," +
        "dob," +
        "nationality," +
        "marital_status," +
        "position," +
        "joinDate," +
        "telephone_number," +
        "mobile_number," +
        "permanent_address," +
        "current_address," +
        "emergency_contact_name," +
        "emergency_contact_number," +
        "emergency_contact_relationship," +
        "bank_name," +
        "account_holder," +
        "account_no," +
        "branch," +
        "type_of_account, " +
        "profile)" +
        "value (" +
        " '" + obj.employee_number + "', " +
        " '" + obj.first_name + "', " +
        " '" + obj.last_name + "', " +
        " '" + obj.email + "', " +
        " '" + obj.nic_no + "', " +
        " '" + appFun.getDate(new Date(obj.dob)) + "', " +
        " '" + obj.nationality + "', " +
        " '" + obj.marital_status + "', " +
        " '" + obj.position + "', " +
        " '" + appFun.getDate(new Date(obj.joinDate)) + "', " +
        " '" + obj.telephone_number + "', " +
        " '" + obj.mobile_number + "', " +
        " '" + obj.permanent_address + "', " +
        " '" + obj.current_address + "', " +
        " '" + obj.emergency_contact_name + "', " +
        " '" + obj.emergency_contact_number + "', " +
        " '" + obj.emergency_contact_relationship + "', " +
        " '" + obj.bank_name + "', " +
        " '" + obj.account_holder + "', " +
        " '" + obj.account_no + "', " +
        " '" + obj.branch + "', " +
        " '" + obj.type_of_account + "'," +
        " '" + obj.profile + "' " +
        " )";

    db(queryString, null, obj, (err, result , cbData) => {
        if (err) return cb(true, result, obj);
        return cb(false, result, obj);
    });







};


// Get Employee
exports.getemployee = function (obj, cb) {
    var queryString = "select * from employee where email ='" + obj.email + "'";

    db(queryString, null, obj, (err, result, obj) => {
        if (err) return cb(true, err, obj);

        return cb(false, result, obj);

    });
};


//Get All Employee
exports.getAllEmployee = function (id, cb) {

    var queryString = "select id," +
        "employee_number," +
        "first_name," +
        "last_name," +
        "dob," +
        "telephone_number," +
        "mobile_number," +
        "permanent_address," +
        "email," +
        "nic_no," +
        "position," +
        "joinDate," +
        "profile from employee";

    db(queryString, null, null, (err, result, obj) => {
        if (err) return cb(true, err, obj);

        return cb(false, result, obj);

    });
};


// Get Employee By ID
exports.getEmployeeById = function (id, cb) {
    var queryString = "select * from employee where id ='" + id + "'";

    db(queryString, null, null, (err, result, obj) => {
        if (err) return cb(true, err, obj);

        return cb(false, result, obj);


    });
};


//deleteEmployee
exports.deleteEmployee = function (id, cb) {
    var queryString = "delete from employee where id ='" + id + "'";

    db(queryString, null, null, (err, result, obj) => {
        if (err) return cb(true, err, obj);

        return cb(false, result, obj);


    });
};


// update employee detail
exports.updateEmployeeDetail = function (id, obj, cb) {
    var queryString = "UPDATE employee " +
        "SET employee_number = '" + obj.employee_number + "', " +
        "first_name = '" + obj.first_name + "', " +
        "last_name = '" + obj.last_name + "', " +
        "email = '" + obj.email + "', " +
        "nic_no = '" + obj.nic_no + "', " +
        "dob = '" + appFun.getDate(new Date(obj.dob)) + "', " +
        "nationality = '" + obj.nationality + "', " +
        "marital_status = '" + obj.marital_status + "', " +
        "position = '" + obj.position + "', " +
        "joinDate = '" + appFun.getDate(new Date(obj.joinDate)) + "', " +
        "telephone_number = '" + obj.telephone_number + "', " +
        "mobile_number = '" + obj.mobile_number + "', " +
        "permanent_address = '" + obj.permanent_address + "', " +
        "current_address = '" + obj.current_address + "', " +
        "emergency_contact_name = '" + obj.emergency_contact_name + "', " +
        "emergency_contact_number = '" + obj.emergency_contact_number + "', " +
        "emergency_contact_relationship = '" + obj.emergency_contact_relationship + "', " +
        "bank_name = '" + obj.bank_name + "', " +
        "account_holder = '" + obj.account_holder + "', " +
        "account_no = '" + obj.account_no + "', " +
        "branch = '" + obj.branch + "', " +
        "type_of_account = '" + obj.type_of_account + "', " +
        "profile = '" + obj.profile + "' " +
        "WHERE id = '" + id + "' ";

    db(queryString, null, null, (err, result, obj) => {
        if (err) return cb(true, err, obj);

        return cb(false, result, obj);
    });
};


// Update Profile
exports.UpdateProfile = function (id, obj, cb) {
    var queryString = "UPDATE employee SET profile = '" + obj.profile + "' WHERE id = '" + id + "' ";

    db(queryString, null, null, (err, result, obj) => {
        if (err) return cb(true, err, obj);
        return cb(false, result, obj);
    });
};
