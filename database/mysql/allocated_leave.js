var db = require('./connection');

// Add Allocated Leave
exports.addAllocatedLeave = function (obj, result, cb) {
    // console.log('addAllocatedLeave', result);
    var queryString = "insert into allocated_leave (employee_id,leave_type_id,allocated,taken) value " +
        " (" + obj + ",2," + result.annual + ",0)," +
        "(" + obj + ",1," + result.casual + ",0)," +
        "(" + obj + ",3," + result.sick + ",0)";
    // console.log('queryString', queryString);
        " (" + obj + ",1," + result.casual + ",0)," +
        "(" + obj + ",3," + result.sick + ",0)," +
        " (" + obj + ",4," + result.nopay + ",0)";
    db(queryString, null, obj, (err, result, cbData) => {
        // console.log(queryString);
        if (err) return cb(true, result, obj);

        return cb(false, result, obj);
    });
};

// Add Auto Allocate Leave
exports.autoAllocateLeave = function (obj, cb) {
    var queryString = "INSERT INTO allocation_setup (start, end, casual, annual, sick) value ";
    var value = "";
    // Allocate_Leave
    // console.log('123456', obj);
    for (var i = 0; i < obj.allocated.length; i++) {
        value = value + "( '" + obj.allocated[i] ['start'] + "', " +
            " '" + obj.allocated[i] ['end'] + "', " +
            " '" + obj.allocated[i]['casual'] + "', " +
            " '" + obj.allocated[i]['annual'] + "', " +
            " '" + obj.allocated[i]['sick'] + "', " +
            " '" + obj.allocated[i] ['nopay'] + "') " + (obj.allocated.length - 1 > i ? "," : "");
    }
    // console.log('quary', value111);
    db(queryString + value, null, obj, (err, result, cbData) => {
        if (err) return cb(true, err, cbData);
        return cb(false, result, cbData);
    });
};





// Get Leave Summary
exports.getAllLeaveSummary = function (obj, cb) {

    let queryString = "select " +
        "al.id, " +
        "al.employee_id," +
        "emp.first_name," +
        "emp.profile," +
        "al.leave_type_id," +
        "lt.name as leave_type," +
        "al.allocated," +
        "al.taken" +
        " from allocated_leave as al" +
        " INNER JOIN employee AS emp" +
        " on emp.id = al.employee_id " +
        "INNER JOIN leave_type as lt " +
        "ON al.leave_type_id = lt.id ";

    db(queryString, null, null, (err, result, obj) => {
        if (err) return cb(true, result, obj);
        return cb(false, result, obj);
    });
};


// Get Allocated Leave
exports.getAllocatedLeave = function (obj, cb) {
     // console.log('getAllocatedLeave',obj);

    if(obj.leave_type_id===7 || obj.leave_type_id===6)
    {
        var queryString2 = "select * from allocated_leave where employee_id = '" + obj.employee_id + "' and leave_type_id =  '1' ";
        db(queryString2, null, obj, (err, result, obj) => {
            if (err) return cb(true, result, obj);

            if(result[0].allocated === result[0].taken) {
                    var queryString3 = "select * from allocated_leave where employee_id = '" + obj.employee_id + "' and leave_type_id =  '2' ";
                    db(queryString3, null, obj, (err, result, obj) => {
                        if (err) return cb(true, result, obj);
                        return cb(false, result, obj);
                    });
                }

            return cb(false, result, obj);
        });
      }

    else{
        var queryString = "select * from allocated_leave where employee_id = '" + obj.employee_id + "' and leave_type_id =  '" + obj.leave_type_id + "' ";
        db(queryString, null, obj, (err, result, obj) => {
            if (err) return cb(true, result, obj);
            return cb(false, result, obj);
        });
    }
};


//  update allocated_leave detail
exports.updateAllocatedLeaveDetail = function (id, obj, cb) {
    if(obj.leave_type_id === 6){
        var queryStringForLeaveHalfday = "UPDATE allocated_leave SET  taken = (taken) + 0.5 WHERE id=" + id;
        db(queryStringForLeaveHalfday, null, obj, (err, result, obj) => {

            if (err) return cb(true, result, obj);
            return cb(false, result, obj);
        });
    }
    else {
        var queryString = "UPDATE allocated_leave SET  taken = LAST_INSERT_ID(taken) + " + obj.dates.length + " WHERE id=" + id;
        db(queryString, null, obj, (err, result, obj) => {
            if (err) return cb(true, result, obj);
            return cb(false, result, obj);
        });
    }




};


//  update allocated_leave detail when cancel
exports.updateAllocatedLeaveCancelDetail = function (obj, cb) {
    if(obj.leave_type_id === 6){
        var queryStringSubHalfDay = "UPDATE allocated_leave SET  taken = LAST_INSERT_ID(taken) - 0.5" + " WHERE employee_id=" + obj.employee_id + "AND" + "leave_type_id=6";

        db(queryStringSubHalfDay, null, obj, (err, result, obj) => {
            if (err) return cb(true, result, obj);

            return cb(false, result, obj);
        });
    }
    else
    {
        var queryString = "UPDATE allocated_leave SET  taken = LAST_INSERT_ID(taken) - 1" + " WHERE employee_id=" + obj.employee_id + "AND" + "leave_type_id=" + obj.leave_type_id;

        db(queryString, null, obj, (err, result, obj) => {
            if (err) return cb(true, result, obj);

            return cb(false, result, obj);
        });
    }



};



// Get All Auto Allocate Leave
exports.getAllAutoAllocateLeave = function (obj, callback) {
    // console.log('coming to Mysql', obj);
    var queryString = "SELECT * FROM `allocation_setup`";

    db(queryString, null, obj, (err, result, cbData) => {
        if (err) return callback(true, err, cbData);
        return callback(false, result, cbData);

    });
};


// Get All Auto Allocate Leave By Month
exports.getAllAutoAllocateLeaveByMonth = function (obj, res, callback) {
    var fullDateOfJoin = new Date(obj.joinDate);
    var monthOfJoin = fullDateOfJoin.getMonth() + 1;
    var queryString = "SELECT al.`annual`,al.`casual`, al.`sick` from allocation_setup al WHERE " + monthOfJoin + " BETWEEN start and end";

    db(queryString, null, obj, (err, result, cbData) => {
        if (err) return callback(true, err, cbData);

        return callback(false, result, cbData);
    });
};


// Update Auto Allocate Leave
exports.updateAutoAllocateLeave = function (obj, cb) {

    var queryString0 = " UPDATE allocation_setup " +
        " SET " +
        " start = '" + obj.allocated[0] ['start'] + "' ," +
        " end = '" + obj.allocated[0] ['end'] + "' ," +
        " casual = '" + obj.allocated[0] ['casual'] + "' ," +
        " annual = '" + obj.allocated[0] ['annual'] + "', " +
        " sick = '" + obj.allocated[0] ['sick'] + "' " +
        " WHERE id = 57";

    var queryString1 = " UPDATE allocation_setup " +
        " SET " +
        " start = '" + obj.allocated[1] ['start'] + "' ," +
        " end = '" + obj.allocated[1] ['end'] + "' ," +
        " casual = '" + obj.allocated[1] ['casual'] + "' ," +
        " annual = '" + obj.allocated[1] ['annual'] + "', " +
        " sick = '" + obj.allocated[1] ['sick'] + "' " +
        " WHERE id = 58 ";

    var queryString2 = " UPDATE allocation_setup " +
        " SET " +
        " start = '" + obj.allocated[2] ['start'] + "' ," +
        " end = '" + obj.allocated[2] ['end'] + "' ," +
        " casual = '" + obj.allocated[2] ['casual'] + "' ," +
        " annual = '" + obj.allocated[2] ['annual'] + "', " +
        " sick = '" + obj.allocated[2] ['sick'] + "' " +
        " WHERE id = 59 ";

    db(queryString0, null, obj, (err, result, cbData) => {
        if (err) {
            return cb(true, err, cbData);
        }
    });
    db(queryString1, null, obj, (err, result, cbData) => {
        if (err) {
            return cb(true, err, cbData);
        }
    });
    db(queryString2, null, obj, (err, result, cbData) => {
        if (err) {
            return cb(true, err, cbData);
        }
        return cb(false, result, obj);
    });
};


