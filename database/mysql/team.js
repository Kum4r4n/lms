
var db = require('./connection');


// add team
exports.addteam = function (obj, cb) {
    var queryString = "INSERT INTO `team` (name) value ( '" + obj.name + "' )" ;

    db(queryString,null,obj, (err, result, cbData) => {
        if (err) return cb(true, result, obj);   
      
        return cb(false, result, obj);
    });
};


// get all team
exports.getAllTeam = function (cb) {
    var queryString = "select * from team";

    db(queryString, null, null, (err, result, obj) => {
        if (err) return cb(true, err, obj);

        return cb(false, result, obj);

    });
};


//get Team And Employee
exports.getTeamAndEmployee = function (cb) {
    var queryString = "SELECT " +
        "employee.id," +
        "employee.first_name," +
        "team.id," +
        "team.name " +
        "FROM employee " +
        "INNER JOIN user " +
        "ON employee.id=user.employee_id " +
        "INNER JOIN user_team " +
        "ON user.id=user_team.user_id " +
        "right join team " +
        "ON user_team.team_id=team.id";

    db(queryString, null, null, (err, result, obj) => {
        if (err) return cb(true, err, obj);

        return cb(false, result, obj);

    });
};


// get all employee by team
exports.getAllEmployeeByTeam = function (team_id,cb) {
    var queryString = "select * from user_team  WHERE team_id = '" + team_id + "' ";

    db(queryString, null, team_id, (err, result, obj) => {
        if (err) return cb(true, err, obj);

        return cb(false, result, obj);

    });
};


//  delete team
exports.deleteTeam = function (id,cb) {
    var queryString =  "DELETE FROM team WHERE id = " + id;

    db(queryString, null, null, (err, result, obj) => {
        if (err) return cb(true, err, obj);

        return cb(false, result, obj);

    });
};


// update team
exports.updateTeam = function (id,obj,cb) {
    var queryString = "UPDATE team SET name = '" + obj.name + "' " + "WHERE id = " + id;

    db(queryString, null, null, (err, result, obj) => {
        if (err) return cb(true, err, obj);

        return cb(false, result, obj);

    });
};


// delete User Team By User Id
exports.deleteUserTeamByUserId = function (id, cb) {
    var queryString = "Delete from user_team where user_id = " + id;

    db(queryString, null, null, (err, result, cbData) => {
        if (err) return cb(true, err, cbData);
        return cb(false, result, cbData);
    });
};
