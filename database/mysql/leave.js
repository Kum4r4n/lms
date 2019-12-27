var db = require("./connection");


// Add Leave
exports.addleave = function (obj, id, cb) {
    // console.log('obj for leave apply ', obj);
    var queryString = "INSERT INTO `leave` (" +
        "employee_id, " +
        "user_id, " +
        "leave_type_id, " +
        "leave_date, " +
        "cover_person_id, " +
        "description, " +
        "leave_status, " +
        "cover_person_status, " +
        "short_leave_start_time, " +
        "short_leave_finish_time," +
        "half_day_session) value";
    var value = "";
    // ,created_user

    for (var i = 0; i < obj.dates.length; i++) {
        value = value + "( " +
            " '" + obj.employee_id + "', " +
            " '" + obj.user_id + "', " +
            " '" + obj.leave_type_id + "', " +
            " '" + appFun.getDate(new Date(obj.dates[i])) + "', " +
            " '" + obj.cover_person_id + "', " +
            " '" + obj.description + "', " +
            " '" + '1' + "', " +
            " '" + '3' + " '," +
            " '" + obj.startTime + "', " +
            " '" + obj.endTime + "', " +
            " '" + obj.session + "' )" +
            (obj.dates.length - 1 > i ? "," : "");


    }

    db(queryString + value, null, obj, (err, result, cbData) => {
        // if (err) return cb(err, result, cbData);

        var getEmailByCoverPersonIdQueryString = "SELECT " +
            "emp.email," +
            "lv.employee_id," +
            "lv.leave_date " +
            "FROM employee AS emp ," +
            " `leave` AS lv " +
            "where emp.id = lv.`cover_person_id` " +
            "and lv.cover_person_id= '" + obj.cover_person_id + "' ";

        db(getEmailByCoverPersonIdQueryString, null, null, (err, result, obj) => {
            // console.log('getEmailByCoverPersonIdQueryString', getEmailByCoverPersonIdQueryString);
            if (err) return cb(true, err, obj);
            // return cb(false, result, obj);
            var email = result[0].email.toString();
            var employeeNumber = result[0].employee_id.toString();
            var date = result[0].leave_date;
            mail.sendMail(email, 'Leave Request',
                '' +
                '<html lang="en">' +
                '<head>' +
                '    <style>' +
                '.table-wrapper{' +
                '    margin: 10px 20px 20px;' +
                '    box-shadow: 2px 3px 2px rgba( 0, 0, 0, 0.2 );' +
                '}' +
                '.fl-table {' +
                '    border-radius: 5px;' +
                '    font-size: 18px;' +
                '    font-weight: normal;' +
                '    border: none;' +
                '    border-collapse: collapse;' +
                '    width: 100%;' +
                '    max-width: 100%;' +
                '    white-space: nowrap;' +
                '    background-color: white;' +
                '}' +
                '.fl-table td, .fl-table th {' +
                '    text-align: left;' +
                '    padding: 8px;' +
                '}' +
                '.fl-table td {' +
                '    border: 1px solid #AEB6BF;' +
                '    font-size: 15px;' +
                '}' +
                '.fl-table thead th {' +
                '    border: 1px solid #AEB6BF;' +
                '    color: #ffffff;' +
                '    background: #009688;' +
                '}' +
                '.fl-table tr:nth-child(even) {' +
                '    background: #D6DBDF;' +
                '}' +
                '    </style>' +
                '</head>' +
                '<body style="background-color: #f4f4f5;">' +
                '        <table align="center" cellpadding="0" cellspacing="0" style="background-color: #fff; width: 100%; max-width: 80%; height: 100%; padding: 20px;"> ' +
                '            <tbody> ' +
                '              <tr> ' +
                '                <td >' +
                '                  <img src="https://media.licdn.com/dms/image/C510BAQF6wyCzdoym6Q/company-logo_200_200/0?e=2159024400&v=beta&t=6-THeyi1gNiwGRsy6u2LpFSGtyJBtwXtxq83zdqM-D0" style="width: 56px; padding: 20px;"> ' +
                '                    <div> You are request  as a cover person below  </div>' +
                '                    <div class="table-wrapper">' +
                '                      <table class="fl-table">' +
                '                          <thead>' +
                '                          <tr>' +
                '                              <th>Employee Number</th>' +
                '                              <th>Leave Date</th>' +
                '                              <th>Cover Person Status</th>' +
                '                          </tr>' +
                '                          </thead>' +
                '                          <tbody>' +
                '                          <tr>' +
                '                              <td> ' + employeeNumber + ' </td>' + // Employee Name
                '                              <td> ' + date + ' </td>' + // Leave Date
                '                               <td style="text-align: center;">' + // View Leave Requests
                '                                   <a href="http://localhost:4200/main/viewleaveadmin" style="cursor: pointer; target:_blank"> <button style="border: none; color: #ffffff; font-size: 16px; font-weight: 600; letter-spacing: 0.7px; line-height: 30px; width: 110px; ' +
                '                                    background-color: #009688; border-radius: 4px; text-align: center;" > Yes </button> </a> ' +
                '                                   <a href="http://localhost:4200/main/viewleaveadmin" style="cursor: pointer; target:_blank"> <button style="border: none; color: #ffffff; font-size: 16px; font-weight: 600; letter-spacing: 0.7px; line-height: 30px; width: 110px; ' +
                '                                    background-color: #009688; border-radius: 4px; text-align: center;" > No </button> </a> ' +
                '                               </td>' +
                '                          </tr>' +
                '                          <tbody>' +
                '                      </table>' +
                '                    </div>' +
                '                </td> ' +
                '              </tr> ' +
                '            </tbody> ' +
                '        </table> ' +

                '    </body> ' +
                '</html>', (err, result) => {
                    // console.log('result 100000', result);
                    // return cb(false, result, obj);
                });
        });

        var getEmailByEmployeeIdQueryString = "SELECT " +
            "lv.employee_id," +
            "lv.leave_date," +
            "lv.description," +//
            "lv.half_day_session," +
            "lv.short_leave_start_time," +
            "lv.short_leave_finish_time," +
            "emp.email, " +
            "emp.first_name, " +
            "lt.name " +
            "FROM employee AS emp " +
            "INNER JOIN  `leave` AS lv " +
            "ON emp.id = lv.employee_id " +
            "INNER JOIN  leave_type AS lt " +
            "ON lv.leave_type_id = lt.id " +
            "WHERE lv.employee_id = '" + obj.employee_id + "' ";

        db(getEmailByEmployeeIdQueryString, null, null, (err, result, obj) => {
            var email = result[0].email.toString();
            var name = result[0].name.toString();
            var employee = result[0].first_name.toString();
            var description = result[0].description.toString();
            var half_day_session = result[0].half_day_session.toString();
            var short_leave_start_time = result[0].short_leave_start_time.toString();
            var short_leave_finish_time = result[0].short_leave_finish_time.toString();
            var date = result[0].leave_date;
            if (err) return cb(true, err, obj);
            // console.log('getEmailByEmployeeIdQueryString', result);

            mail.sendMail(email, 'Leave Request',
                '' +
                '<html lang="en">' +
                '<head>' +
                '    <style>' +
                '.table-wrapper{' +
                '    margin: 10px 20px 20px;' +
                '    box-shadow: 2px 3px 2px rgba( 0, 0, 0, 0.2 );' +
                '}' +
                '.fl-table {' +
                '    border-radius: 5px;' +
                '    font-size: 18px;' +
                '    font-weight: normal;' +
                '    border: none;' +
                '    border-collapse: collapse;' +
                '    width: 100%;' +
                '    max-width: 100%;' +
                '    white-space: nowrap;' +
                '    background-color: white;' +
                '}' +
                '.fl-table td, .fl-table th {' +
                '    text-align: left;' +
                '    padding: 8px;' +
                '}' +
                '.fl-table td {' +
                '    border: 1px solid #AEB6BF;' +
                '    font-size: 15px;' +
                '}' +
                '.fl-table thead th {' +
                '    border: 1px solid #AEB6BF;' +
                '    color: #ffffff;' +
                '    background: #009688;' +
                '}' +
                '.fl-table tr:nth-child(even) {' +
                '    background: #D6DBDF;' +
                '}' +
                '    </style>' +
                '</head>' +
                '<body style="background-color: #f4f4f5;">' +
                '        <table align="center" cellpadding="0" cellspacing="0" style="background-color: #fff; width: 100%; max-width: 80%; height: 100%; padding: 20px;"> ' +
                '            <tbody> ' +
                '              <tr> ' +
                '                <td >' +
                '                  <img src="https://media.licdn.com/dms/image/C510BAQF6wyCzdoym6Q/company-logo_200_200/0?e=2159024400&v=beta&t=6-THeyi1gNiwGRsy6u2LpFSGtyJBtwXtxq83zdqM-D0" style="width: 56px; padding: 20px;"> ' +
                '                    <div class="table-wrapper">' +
                '                      <table class="fl-table">' +
                '                          <thead>' +
                '                          <tr>' +
                '                              <th>Employee Name</th>' +
                '                              <th>Leave Type</th>' +
                '                              <th>Leave Date</th>' +
                '                              <th>Reason</th>' +
                '                              <th style="text-align: center;">Action</th>' +
                '                          </tr>' +
                '                          </thead>' +
                '                          <tbody>' +
                '                          <tr>' +
                '                              <td> ' + employee + ' </td>' + // Employee Name
                '                              <td>  ' + name + ' <br> ' + short_leave_start_time + ' - ' + short_leave_finish_time + ' <b> ' + half_day_session + '</b>  </td>' + // Leave Type Name
                '                              <td> ' + date + ' </td>' + // Leave Date
                '                              <td> ' + description + ' </td>' + // Leave Reasion
                '                               <td style="text-align: center;">' + // View Leave Requests
                '                                   <a href="http://localhost:4200/main/viewleaveadmin" style="cursor: pointer; target:_blank"> <button style="border: none; color: #ffffff; font-size: 16px; font-weight: 600; letter-spacing: 0.7px; line-height: 30px; width: 110px; ' +
                '                                    background-color: #009688; border-radius: 4px; text-align: center;" > View Leave </button> </a> ' +
                '                               </td>' +
                '                          </tr>' +
                '                          <tbody>' +
                '                      </table>' +
                '                    </div>' +
                '                </td> ' +
                '              </tr> ' +
                '            </tbody> ' +
                '        </table> ' +
                '    </body> ' +
                '</html>', (err, result) => {
                    return cb(false, result, obj);
                });


        });

    });
};


// Get All Leave Type
exports.getAllLeavetype = function (cb) {
    var queryString = "select * from leave_type";

    db(queryString, null, null, (err, result, obj) => {
        if (err) return cb(true, err, obj);
        return cb(false, result, obj);
    });
};


// get all leaves
exports.getAllLeave = function (status, cb) {
    let queryString =
        "SELECT l.id, " +
        "e.id AS employee_id," +
        "e.first_name," +
        "e.profile," +
        "e.last_name," +
        "DATE_FORMAT(l.leave_date, \"%Y-%m-%d\") as leave_date," +
        "l.cover_person_id," +
        "e1.first_name AS cover_person_first_name," +
        "e1.last_name AS cover_person_last_name," +
        "l.leave_type_id," +
        "lt.name as leave_type," +
        "l.description," +
        "ls.type as leave_status, " +
        "l.leave_status as leave_status_id " +
        "from `leave` AS l  " +
        "INNER JOIN employee AS e " +
        "on e.id = l.employee_id  " +
        "INNER JOIN employee AS e1 " +
        "on e1.id = l.cover_person_id  " +
        "INNER JOIN leave_type AS lt " +
        "ON l.leave_type_id = lt.id " +
        "INNER JOIN leave_status_type AS ls " +
        "ON l.leave_status = ls.id ";

    // let condition = " where leave_status =" + parseInt(status);
    // queryString = parseInt(status) > 0 ? queryString + condition : queryString;
    db(queryString, null, null, (err, result, obj) => {
        if (err) return cb(true, err, obj);
        return cb(false, result, obj);
    });
};


// Get All Leave By Employee ID
exports.getAllLeaveByEmployeeId = function (id, cb) {
    let queryString =
        "SELECT l.id, " +
        "e.id AS employee_id," +
        "e.first_name," +
        "e.last_name," +
        "e.profile," +
        "l.leave_date," +
        "l.cover_person_id," +
        "lt.name,ls.type, " +
        "l.leave_type_id," +
        "l.leave_status " +
        "from `leave` AS l  " +
        "INNER JOIN employee AS e " +
        "on e.id = l.employee_id  " +
        "INNER JOIN leave_type AS lt " +
        "ON l.leave_type_id = lt.id " +
        "INNER JOIN leave_status_type AS ls " +
        "ON l.leave_status = ls.id ";
    let condition = " where id =" + parseInt(id);
    queryString = parseInt(id) > 0 ? queryString + condition : queryString;
    db(queryString, null, null, (err, result, obj) => {
        if (err) return cb(true, err, obj);
        return cb(false, result, obj);
    });
};


// Get All Leave By Employee ID2
exports.getAllLeaveByEmployeeId2 = function (nId, cb) {
    var queryString =
        "SELECT l.id," +
        "e.id AS employee_id," +
        "e.first_name," +
        "e.last_name," +
        "l.leave_date," +
        "l.cover_person_id," +
        "lt.name," +
        "ls.type, " +
        "l.leave_type_id," +
        "l.leave_status " +
        "from `leave` AS l  " +
        "INNER JOIN employee AS e " +
        "on e.id = l.employee_id  " +
        "INNER JOIN leave_type AS lt " +
        "ON l.leave_type_id = lt.id " +
        "INNER JOIN leave_status_type AS ls " +
        "ON l.leave_status = ls.id  " +
        "where employee_id =" +
        nId;

    db(queryString, null, null, (err, result, obj) => {
        if (err) return cb(true, err, obj);
        return cb(false, result, obj);
    });
};


//Get All Leave By Employee ID3
exports.getAllLeaveByEmployeeId3 = function (employee_id, cb) {
    var queryString =
        "SELECT l.id," +
        "e.id AS employee_id," +
        "e.first_name," +
        "e.last_name," +
        "l.leave_date," +
        "l.cover_person_id," +
        "lt.name,ls.type, " +
        "l.leave_type_id," +
        "l.leave_status " +
        "from `leave` AS l  " +
        "INNER JOIN employee AS e " +
        "on e.id = l.employee_id  " +
        "INNER JOIN leave_type AS lt " +
        "ON l.leave_type_id = lt.id " +
        "INNER JOIN leave_status_type AS ls " +
        "ON l.leave_status = ls.id  " +
        "where employee_id =" +
        employee_id;

    db(queryString, null, null, (err, result, obj) => {
        if (err) return cb(true, err, obj);
        return cb(false, result, obj);
    });
};


// leave accept
exports.acceptLeave = function (id, obj, cb) {

    if (obj.leave_type_id === 7 || obj.leave_type_id === 6) {
        var queryStringForAccept = "UPDATE `leave` SET leave_status= 2 " + "WHERE id=" + id;
        db(queryStringForAccept, null, null, (err, result) => {
            if (err) return cb(true, err);
            var queryStringForAcceptAdd = "UPDATE " +
                "allocated_leave " +
                "SET taken =(taken) + 0.5 " +
                "WHERE employee_id = '" + obj.employee_id + "' " +
                "AND leave_type_id = '1' " +
                "AND taken < allocated ";
            db(queryStringForAcceptAdd, null, null, (err, result) => {
                // console.log('result queryString2 ', queryStringForAcceptAdd);
                if (err) return cb(true, err, obj);
                return cb(false, result, obj);
            });
        });
    } else {
        var queryString = "UPDATE `leave` SET leave_status= 2 " + "WHERE id=" + id;
        db(queryString, null, null, (err, result) => {
            if (err) return cb(true, err);
            var queryString1 = "UPDATE " +
                "allocated_leave " +
                "SET taken =(taken + 1) " +
                "WHERE employee_id = '" + obj.employee_id + "' " +
                "AND leave_type_id = '" + obj.leave_type_id + "' " +
                "AND taken < allocated ";
            db(queryString1, null, null, (err, result) => {
                if (err) return cb(true, err, obj);
                return cb(false, result, obj);
            });
        });
    }
};


// leave reject
exports.rejectLeave = function (id, obj, cb) {
    // console.log('id', id);
    if (obj.leave_type_id === 7 || obj.leave_type_id === 6) {
        var queryStringSub = "UPDATE `leave` SET leave_status= 4 " + "WHERE id=" + id;
        db(queryStringSub, null, null, (err, result) => {
            if (err) return cb(true, err);
            var queryStringSub1 = "UPDATE " +
                "allocated_leave " +
                "SET taken = (taken - 0.5) " +
                "WHERE employee_id = '" + obj.employee_id + "' " +
                "AND leave_type_id = '1' " +
                "AND taken > 0 ";
            db(queryStringSub1, null, null, (err, result) => {
                // console.log('queryStringSub1', queryStringSub1);
                if (err) return cb(true, err, obj);
                return cb(false, result, obj);
            });
        });
    } else {
        var queryString = "UPDATE `leave` SET leave_status= 4 " + "WHERE id=" + id;
        db(queryString, null, null, (err, result) => {
            if (err) return cb(true, err);
            var queryString1 = "UPDATE " +
                "allocated_leave " +
                "SET taken = (taken - 1) " +
                "WHERE employee_id = '" + obj.employee_id + "' " +
                "AND leave_type_id = '" + obj.leave_type_id + "' " +
                "AND taken > 0 ";
            db(queryString1, null, null, (err, result) => {
                if (err) return cb(true, err, obj);
                return cb(false, result, obj);
            });
        });
    }
};


// leave cancel
exports.cancelLeave = function (id, rId, cb) {
    var queryString = "UPDATE `leave` SET leave_status= 3 " + "WHERE id=" + id;

    db(queryString, null, null, (err, result, obj) => {
        if (err) return cb(true, err, obj);
        return cb(false, result, obj);
    });
};


// cover person status
exports.coverPersonLeaveStatus = function (id, cb, obj) {
    var queryString = "UPDATE `leave` SET cover_person_status= 2 " + "WHERE id=" + id;

    db(queryString, null, null, (err, result, obj) => {
        if (err) return cb(true, err, obj);
        return cb(false, result, obj);
    });
};


// leave delete
exports.deleteLeave = function (id, cb) {
    var queryString = "DELETE FROM `leave` WHERE id=" + id;

    db(queryString, null, null, (err, result, obj) => {
        if (err) return cb(true, err, obj);

        return cb(false, result, obj);
    });
};


exports.getLeave = function (obj, cb) {
    var queryString = "select leave_date,leave_type_id FROM  `leave` WHERE employee_id = '" + obj.employee_id + "' AND leave_type_id =  '" + obj.leave_type_id + "' ";
    db(queryString, null, obj, (err, result, obj) => {
        if (err) return cb(true, result, obj);

        return cb(false, result, obj);

    });
};

exports.getAllLeaveDetails = function (obj, cb) {
    var queryString = "SELECT * FROM `leave` ";

    db(queryString, null, obj, (err, result, obj) => {
        if (err) return cb(true, result, obj);
        return cb(false, result, obj);
    });
};

// *************************Reason For Reject Leave*************** //

exports.reasonForReject = function (id, obj, cb) {
    var queryStringSub = "UPDATE " +
        " `leave` " +
        "SET reason =  '" + obj.reasonFroReject + "'" +
        "WHERE id = '" + id + "' " +
        "AND leave_date = '" + obj.leave_date + "' ";
    db(queryStringSub, null, null, (err, result) => {
        return cb(false, result, obj);
    });
};
