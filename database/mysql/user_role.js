var db = require('./connection');


// addUserRole
exports.addUserRole = function (obj, id, cb) {
    var queryString = "INSERT INTO user_role (user_id,role_id) value ('" + id + "',2)";

    db(queryString, null, id, (err, result, cbData) => {
        if (err) return cb(true, err, obj);

        return cb(false, result, obj);

    });
};


//role
exports.role = function (id, cb) {
    var queryString = "SELECT " +
        "r.id," +
        "r.name " +
        "from role AS r " +
        "INNER JOIN user_role AS ur " +
        "on r.id = ur.role_id " +
        "where ur.user_id = " + id;

    db(queryString, null, null, (err, result, cbData) => {
        if (err) return cb(true, err, cbData);

        return cb(false, result, cbData);
    });
};


// delete User Role By User Id
exports.deleteUserRoleByUserId = function (id, cb) {
    var queryString = "Delete from user_role where user_id =" + id;

    db(queryString, null, null, (err, result, cbData) => {
        if (err) return cb(true, err, cbData);
        return cb(false, result, cbData);
    });
};

