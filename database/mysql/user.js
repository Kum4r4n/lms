var db = require('./connection');
const uuidv4 = require('uuid/v4');


// login
exports.login = function (username, password, cb) {
    var query = `select * from user where email = '${username}'`;

    db(query, null, password, (err, result, cbData) => {
        if (err) return cb(true, err);
        else if (result.length === 0) {
            return cb(true, 'There is no user with this email')
        } else if (!appFun.passwordVerify(cbData, result[0].password)) {
            return cb(true, 'Wrong password');
        }
        return cb(false, result);
    });
};


// privilege
exports.privilege = function (id, cb) {
    var query = `SELECT 
    p.id,
    p.name,
    ur.role_id 
    FROM privilege AS p 
    INNER JOIN role_privilege AS rp 
    ON rp.privilege_id = p.id 
    INNER JOIN user_role AS ur 
    ON rp.role_id = ur.role_id 
    WHERE ur.user_id = ${id}`;

    db(query, null, null, (err, result, cbData) => {
        if (err) return cb(true, err, cbData);

        return cb(false, result, cbData);
    });
};


// registration
exports.registration = function (obj, id, cb) {
    var queryString = "INSERT into " +
        "user (" +
        "employee_id," +
        "code,email," +
        "password," +
        "active" +
        ") " +
        " value (" +
        " '" + id + "', " +
        " '" + uuidv4() + "', " +
        " '" + obj.email + "', " +
        " '" + obj.password + "', " +
        " '" + '0' + "' )";

    db(queryString, null, obj, (err, result, cbData) => {
        if (err) return cb(true, err);

        return cb(false, result);

    });
};


// get All User
exports.getAllUser = function (obj, cb) {

    let queryString = "select " +
        "al.id, " +
        "al.employee_id," +
        "al.email," +
        "emp.profile," +
        "emp.first_name," +
        "al.code," +
        "al.password" +
        " from user as al" +
        " INNER JOIN employee AS emp" +
        " on emp.id = al.employee_id ";

    db(queryString, null, null, (err, result, cbData) => {
        if (err) return cb(true, err, cbData);

        return cb(false, result, cbData);

    });
};


// get User By Emp Id
exports.getUserByEmpId = function (id, cb) {
    var queryString = "SELECT * from user where employee_id = " + id;

    db(queryString, null, null, (err, result, cbData) => {
        if (err) return cb(true, err, cbData);
        return cb(false, result, cbData);
    });
};
exports.getUserByEmail = function (email, cb) {
    var queryString = "SELECT * from user where email = '" + email+"'";

    db(queryString, null, null, (err, result, cbData) => {
        if (err) return cb(true, err, cbData);
        return cb(false, result, cbData);
    });
};


// delete User By Emp Id
exports.deleteUserByEmpId = function (id, cb) {
    var queryString = "Delete from user where employee_id = " + id;

    db(queryString, null, null, (err, result, cbData) => {
        if (err) return cb(true, err, cbData);
        return cb(false, result, cbData);
    });
};


// changePassword
exports.changePassword = function (email, password, cb) {
    var queryString = `UPDATE user SET password ='${password}', active = true WHERE email='${email}'`;

    db(queryString, null, null, (err, result, cbData) => {
        if (err) return cb(true, err, cbData);
        return cb(false, result, cbData);
    });
};


// forgetPassword
exports.forgetPassword = function (email, password, cb) {
    var queryString = `UPDATE user SET password ='${password}', active = false WHERE email='${email}'`;

    db(queryString, null, null, (err, result, cbData) => {
        if (err) return cb(true, err, cbData);
        return cb(false, result, cbData);
    });
};








