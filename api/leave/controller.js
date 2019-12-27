'use strict';
var db = require('../../database/mysql/leave');
var allocated_leavedb = require('../../database/mysql/allocated_leave');
var Leave = require('./class');
var leave = new Leave();


// addleave
exports.addleave = function (req, res, next) {

    var obj = req.body;

    var leaveDate = obj.leaveDates;
    var leave_month = new Date(leaveDate[0]).getMonth() + 1;
    var leave_year = new Date(leaveDate[0]).getFullYear();
    var Short_leave_date = leave_month + "-" + leave_year;


    // return res.status(400).json({ status: false, message: "You can't ", result: "please ask your admin for this" });
    obj.user_id = appFun.jwtDecord(req).uId;
    if (appFun.jwtDecord(req).role_id === 2 && appFun.jwtDecord(req).eId !== obj.employee_id) {
        return res.status(400).json({
            status: false,
            message: "You can't! Please ask your admin for this",
            result: "please ask your admin for this"
        });
    }

    if(obj.leave_type_id === 7 && leaveDate.length > 1) {
        return res.status(400).json({
            status: false,
            message: "You can't! Apply for Short leave many days",
            result: "Can't! Apply for Short leave many days"
        });
    }

    if(obj.leave_type_id === 6 && leaveDate.length > 1) {
        return res.status(400).json({
            status: false,
            message: "You can't! Apply for half day many days",
            result: "Can't! Apply for Short leave many days"
        });
    }

    if ( '10:00' < obj.startTime && '15:30' > obj.startTime ) {
        return res.status(400).json({
            status: false,
            message: "Hey! Please select Valid Start Time",
            result: "please select your Valid Start Time"
        });
    }
    if ( '10:00' < obj.endTime && '15:30' > obj.endTime ) {
        return res.status(400).json({
            status: false,
            message: "Hey! Please select Valid End Time",
            result: "please select your Valid End Time"
        });
    }
    let dates = obj.leaveDates;
    if ( new Date() > new Date(dates[0])) {
        return res.status(400).json({
            status: false,
            message: "Hey! Please select Valid Date & This date is before",
            result: "please select your Valid Date"
        });
    } else {
        if(dates.length > 1) {
            let d = dates[0];
            for(let i = 1; i< dates.length; i++) {
                if(new Date(d) < new Date(dates[i]) && new Date() < new Date(dates[i])) {
                    d = dates[i];
                } else {
                    return res.status(400).json({
                        status: false,
                        message: "Hey! Please select Valid Date",
                        result: "please select your Valid Date"
                    });
                }
            }
        }
    }

    if (obj.employee_id === obj.cover_person_id) {
        return res.status(400).json({
            status: false,
            message: "Hey! Please select your peer for cover person",
            result: "please select your peer for cover person"
        });
    }

    if (!Array.isArray(obj.dates) || obj.dates.length === 0) {
        return res.status(400).json({
            status: false,
            message: "Please check your dates it should be array",
            result: "Please check your dates it should be array"
        });
    }


    // *************************Short Leave Date Validate*************** //

    db.getLeave(obj,function (err, result, obj){

        const fullDate = [];

        result.forEach( date => {
            const month = new Date(date.leave_date).getMonth() + 1;
            const year = new Date (date.leave_date).getFullYear();
            const lDate = month + "-" + year;
            fullDate.push(lDate);
        });
        if(fullDate.find( a => a === Short_leave_date  && result[0].leave_type_id === 7)) {

            return res.status(400).json({
                status: false,
                message: "Same Month So Can't Apply",
                result: "Apply Faild"
            });
        }


    // before add leave check whether user has leave
    allocated_leavedb.getAllocatedLeave(obj, function (err, result, obj) {
        if (err) {
            return res.status(400).json({status: false, message: "Something went wrong", result: result});
        } else if (result.length === 0) {
            return res.status(400).json({
                status: false,
                message: "Failed,Your leave is not allocated yet",
                result: "your leave is not allocated yet"
            });
        } else if (result[0].allocated - result[0].taken < 0) {
            return res.status(400).json({
                status: false,
                message: "Failed,You do not have leave apply through nopay",
                result: "you do not have leave apply through nopay "
            });
        } else if (result[0].allocated - (result[0].taken + obj.dates.length) < 0) {
            return res.status(400).json({
                status: false,
                message: "failed,your leave balance is " + (result[0].allocated - result[0].taken + ", but you are trying to apply")
            });
        }



        var rId = result[0].id;

        db.addleave(obj, rId, function (err, result, cbData) {
            if (err) {
                return res.status(400).json({status: false, message: "failed", result: result});
            } else {
                allocated_leavedb.updateAllocatedLeaveDetail(rId, obj, function (err, result, obj) {
                    if (err) {
                        return res.status(400).json({status: false, message: "failed", result: "update error"});
                    } else {
                        return res.status(200).json({
                            status: true,
                            message: "Your leave requested to your admin",
                            result: "leave progress"
                        });
                    }
                });
            }
        });

        });

// *************************Short Leave Date Validate*************** //

        });
};


// getAllLeavetype
exports.getAllLeavetype = function (req, res, next) {

    db.getAllLeavetype(function (err, result, obj) {
        if (err) {
            return res.status(400).json({status: false, message: "failed", result: "something went wrong"});
        }
        return res.status(200).json({status: true, message: "success", result: leave.getAllLeavetype(result)});
    })
};


// get all leave
exports.getAllLeave = function (req, res, next) {
    var reqBodyResult = appFun.reqBodyValidation(req, res);
    if (reqBodyResult != null) return res.status(400).json({status: false, message: "failed", result: reqBodyResult});

    db.getAllLeave(req.query.status, function (err, result, obj) {
        if (err) {
            return res.status(400).json({status: false, message: "failed", result: "something went wrong"});
        }
        return res.status(200).json({status: true, message: "success", result: leave.getAllLeave(result)});
    })
};


// getAllLeaveByEmployeeId
exports.getAllLeaveByEmployeeId = function (req, res, next) {
    var reqBodyResult = appFun.reqBodyValidation(req, res);
    if (reqBodyResult != null) return res.status(400).json({status: false, message: "failed", result: reqBodyResult});

    db.getAllLeaveByEmployeeId(req.query.id, function (err, result, obj) {
        if (err) {
            return res.status(400).json({status: false, message: "failed", result: "somthing went wrong"});
        }
        // return res.status(200).json({ status: true, message: "success", result: leave.getAllLeaveByEmployeeId(result) });
        return res.status(200).json(leave.getAllLeaveByEmployeeId(result));
    })
};


// getAllLeaveByEmployeeId2
exports.getAllLeaveByEmployeeId2 = function (req, res, next) {
    var nId;
    nId = appFun.jwtDecord(req).eId;
    var reqBodyResult = appFun.reqBodyValidation(req, res);
    if (reqBodyResult != null) return res.status(400).json({status: false, message: "failed", result: reqBodyResult});

    db.getAllLeaveByEmployeeId2(nId, function (err, result, obj) {
        if (err) {
            return res.status(400).json({status: false, message: "failed", result: "something went wrong"});
        }
        return res.status(200).json(leave.getAllLeaveByEmployeeId2(result));
    })

};


// getAllLeaveByEmployeeId3
exports.getAllLeaveByEmployeeId3 = function (req, res, next) {
    var reqBodyResult = appFun.reqBodyValidation(req, res);
    if (reqBodyResult != null) return res.status(400).json({status: false, message: "failed", result: reqBodyResult});

    db.getAllLeaveByEmployeeId3(req.query.employee_id, function (err, result, obj) {
        if (err) {
            return res.status(400).json({status: false, message: "failed", result: "something went wrong"});
        }
        return res.status(200).json(leave.getAllLeaveByEmployeeId3(result));
    })
};


// rejectLeave
exports.rejectLeave = function (req, res, next) {
    var reqBodyResult = appFun.reqBodyValidation(req, res);
    if (reqBodyResult != null)
        return res.status(400).json({status: false, message: "failed", result: reqBodyResult});
    else if (appFun.jwtDecord(req).role_id === 2)
        return res.status(400).json({status: false, message: "failed", result: "you can't accept the leave"});

    db.rejectLeave(req.params.id, req.body, function (err, result, obj) {
        if (err) {
            return res.status(400).json({status: false, message: "failed", result: "something went wrong"});
        }
        return res.status(200).json({status: true, message: "success", result: result});
    })
};


// update accept leave detail
exports.acceptLeave = function (req, res, next) {
    var reqBodyResult = appFun.reqBodyValidation(req, res);
    if (reqBodyResult != null)
        return res.status(400).json({status: false, message: "failed", result: reqBodyResult});
    else if (appFun.jwtDecord(req).role_id === 2)
        return res.status(400).json({status: false, message: "failed", result: "you can't accept the leave"});

    db.acceptLeave(req.params.id, req.body, function (err, result, obj) {
        if (err) {
            return res.status(400).json({status: false, message: "failed", result: "something went wrong"});
        }
        return res.status(200).json({status: true, message: "accept success", result: result});
    })
};


// update cancel leave detail
exports.cancelLeave = function (req, res, next) {
    leave.validateleaveBody(req);
    var reqBodyResult = appFun.reqBodyValidation(req, res);
    if (reqBodyResult != null)
        return res.status(400).json({status: false, message: "failed", result: reqBodyResult});

    db.cancelLeave(req.params.id, rId, function (err, result, obj) {
        if (err) {
            return res.status(400).json({status: false, message: "failed", result: "something went wrong"});
        } else {
            allocated_leavedb.updateAllocatedLeaveCancelDetail(rId, obj, function (err, result, obj) {
                if (err) {
                    return res.status(400).json({status: false, message: "failed", result: "something went wrong"});
                }
                return res.status(200).json({status: true, message: "cancel success", result: result});
            });
        }
    })
};


// update cover person detail
exports.coverPersonLeaveStatus = function (req, res, obj) {
    var reqBodyResult = appFun.reqBodyValidation(req, res);
    if (reqBodyResult != null)
        return res.status(400).json({status: false, message: "failed", result: reqBodyResult});

    db.coverPersonLeaveStatus(req.params.id, function (err, result, obj) {
        if (err) {
            return res.status(400).json({status: false, message: "failed", result: "something went wrong"});
        }
        return res.status(200).json({status: true, message: "success", result: "Wow your cover person accepted!"});
    })
};




// *************************Reason For Reject Leave*************** //

exports.reasonForReject = function (req, res, next) {
    console.log('obj  rejectLeave', req.body);

    var reqBodyResult = appFun.reqBodyValidation(req, res);
    if (reqBodyResult != null)
        return res.status(400).json({status: false, message: "failed", result: reqBodyResult});
    else if (appFun.jwtDecord(req).role_id === 2)
        return res.status(400).json({status: false, message: "failed", result: "you can't accept the leave"});

    db.reasonForReject(req.params.id, req.body, function (err, result, obj) {
        if (err) {
            return res.status(400).json({status: false, message: "failed", result: "something went wrong"});
        }
        return res.status(200).json({status: true, message: "success", result: result});
    })
};





// getAllLeaveByAllEmployee
// exports.getAllLeaveByAllEmployee = function (req, res, next) {
//
// 	var reqBodyResult = appFun.reqBodyValidation(req, res);
// 	if (reqBodyResult != null) return res.status(400).json({ status: false, message: "failed", result: reqBodyResult });
//
// 	db.getAllLeaveByAllEmployee(req,function (err, result, obj) {
// 		if (err) {
// 			return res.status(400).json({ status: false, message: "failed", result: "somthing went wrong" });
// 		}
// 		return res.status(200).json({ status: true, message: "success", result: leave.getAllLeaveByAllEmployee(result) });
//
// 	})
// }

// update reject leave detail
// exports.rejectLeave = function (req, res, next) {
//
// 	var reqBodyResult = appFun.reqBodyValidation(req, res);
// 	if (reqBodyResult != null)
// 		return res.status(400).json({ status: false, message: "failed", result: reqBodyResult });
//
// 	else if (appFun.jwtDecord(req).role_id == 2)
// 		return res.status(400).json({ status: false, message: "failed", result: "you can't accept the leave" });
//
// 	db.rejectLeave(req.params.id, function (err, result, obj) {
// 		if (err) {
// 			return res.status(400).json({ status: false, message: "failed", result: "somthing went wrong" });
// 		}
// 		return res.status(200).json({ status: true, message: "reject success", result: result });
//
// 	})
// }
// delete holiday


