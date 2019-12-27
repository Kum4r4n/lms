'use strict';
var db = require('../../database/mysql/employee');
var userdb = require('../../database/mysql/user');
var user_roledb = require('../../database/mysql/user_role');
var team_db = require('../../database/mysql/team');
var mail = require('../../app/email/sendMail');
var Employee = require('./class');
var employee = new Employee();
var allocated_leave = require('../../database/mysql/allocated_leave');
// const uuidv4 = require('uuid/v4');

// add employee
exports.add = function (req, res, next) {
    employee.validateRegistrationBody(req);
    var reqBodyResult = appFun.reqBodyValidation(req, res);
    if (reqBodyResult != null) return res.status(400).json({status: false, message: "failed", result: reqBodyResult});

    db.getemployee(req.body, function (err, result, obj) {
        if (err) {
            return res.status(400).json({status: false, message: "failed", result: "something went wrong"});
        } else if (result.length !== 0) {
            return res.status(400).json({
                status: false,
                message: "Requested email already exists please try with different email",
                result: "email already"
            });
        }

        db.add(obj, function (err, result, obj) {
            var eid = result.insertId;

            if (err) {
                return res.status(400).json({status: false, message: " request not reached", result: result});
            }
            if (obj.isCreateAccount === true) {
                var generatepassword = appFun.genarateRandoString(6);
                obj.password = appFun.encryptPassword(generatepassword);

                userdb.registration(obj, result.insertId, (err, result, cbData) => {

                    if (err) return res.status(400).json({status: false, message: "failed", result: result});

                    user_roledb.addUserRole(obj, result.insertId, (err, result, cbData) => {
                        if (err) return res.status(400).json({status: false, message: "failed", result: "userroleerr"});
                        //allocaton leave

                        allocated_leave.getAllAutoAllocateLeaveByMonth(obj, res, (err, result, cbData) => {
                            if (err) return res.status(400).json({
                                status: false,
                                message: "failed",
                                result: "Get Auto Allocation Fail"
                            });

                            allocated_leave.addAllocatedLeave(eid, result[0], (err, result, cbData) => {
                                if (err) return res.status(400).json({
                                    status: false,
                                    message: "failed",
                                    result: "Get Auto Allocation Fail"
                                });


                                mail.sendMail(obj.email, 'User Account Details Confirmation',
                                    '' +
                                    '<body style="background-color: #f4f4f5;">' +
                                    '   <table align="center" cellpadding="0" cellspacing="0" style="background-color: #fff; width: 100%; max-width: 680px; height: 100%;"> ' +
                                    '       <tbody> ' +
                                    '           <tr> ' +
                                    '               <td> ' +
                                    '       <table cellpadding="0" cellspacing="0" style="padding: 10px 80px 50px 80px;">' +
                                    '           <tbody>' +
                                    '               <tr>' +
                                    '                   <td style="padding-top: 24px;">' +
                                    '                       <img src="https://media.licdn.com/dms/image/C510BAQF6wyCzdoym6Q/company-logo_200_200/0?e=2159024400&v=beta&t=6-THeyi1gNiwGRsy6u2LpFSGtyJBtwXtxq83zdqM-D0" style="width: 56px;"> ' +
                                    '                   </td> ' +
                                    '               </tr> ' +
                                    '               <tr> ' +
                                    '                   <td colspan="2" style="padding: 30px 0 30px 0; font-size: 40px; font-weight: 600;">' +
                                    '                       <u>Registered Successfully</u>' +
                                    '                   </td>' +
                                    '               </tr> ' +
                                    '               <tr>' +
                                    '                   <td style="color: #9095a2; font-size: 16px; font-weight: 400; "> ' +
                                    '                       You\'re receiving this new password, because you requested a password reset for your Leave Management account by ' +
                                    '                       <b> ' + obj.email + ' </b>\'s e-mail. ' +
                                    '                   </td>' +
                                    '               </tr> ' +
                                    '               <tr> ' +
                                    '                   <td style="padding-top: 24px;color: #9095a2; font-size: 16px; font-weight: 400; ">' +
                                    '                       Please use this password.' +
                                    '                   </td>' +
                                    '               </tr>' +
                                    '               <tr>' +
                                    '                   <td>' +
                                    '                       <h4 style="margin-top: 36px; color: #000;  font-size: 25px; font-weight: 600; letter-spacing: 0.7px; line-height: 40px; width: 140px; ' +
                                    '                            background-color: #fff; border: 3px solid #009688; border-radius: 5px; text-align: center;"> ' +
                                    '                           ' + generatepassword + ' ' +
                                    '                       </h4>' +
                                    '                   </td>' +
                                    '               </tr> ' +
                                    '           </tbody> ' +
                                    '       </table> ' +
                                    '               </td> ' +
                                    '           </tr>' +
                                    '       </tbody> ' +
                                    '   </table> ' +
                                    '</body>', (err, result) => {
                                    });
                            });
                        });

                        return res.status(200).json({
                            status: true,
                            message: "Registration success and this employee add as user in our system",
                            result: "Registration success and this employee add as user in our system"
                        });
                    });


                });

            } else {
                return res.status(200).json({
                    status: true,
                    message: "Registration success and this employee add as user in our system",
                    result: "Registration success and this employee add as user in our system"
                });
            }
        });
    });
};


// get All Employee
exports.getAllEmployee = function (req, res, next) {

    // var tokenObj = appFun.jwtDecord(req);
    var id = null;
    if (appFun.jwtDecord(req).role_id !== 1) {
        id = appFun.jwtDecord(req).eId;
    }

    db.getAllEmployee(id, function (err, result, obj) {
        if (err) {
            return res.status(400).json({status: false, message: "failed", result: "something went wrong"});
        }
        return res.status(200).json({status: true, message: "success", result: employee.getAllEmployee(result)});

    })
};


// get Employee By Id
exports.getEmployeeById = function (req, res, next) {

    db.getEmployeeById(req.params.id, function (err, result, obj) {
        if (err) {
            return res.status(400).json({status: false, message: "failed", result: "something went wrong"});
        }
        return res.status(200).json({status: true, message: "success", result: result});

    })
};


// update employee detail
exports.updateEmployeeDetail = function (req, res, next) {

    db.updateEmployeeDetail(req.params.id, req.body, function (err, result, obj) {
        if (err) {
            return res.status(400).json({status: false, message: "failed", result: "something went wrong"});
        }
        return res.status(200).json({status: true, message: "success", result: employee.updateEmployeeDetail(result)});
    })
};


// update Profile
exports.updateProfile = function (req, res, next) {

    db.UpdateProfile(req.params.id, req.body, function (err, result, obj) {
        if (err) {
            return res.status(400).json({status: false, message: "failed", result: "something went wrong"});
        }
        return res.status(200).json({status: true, message: "success", result: employee.updateProfile(result)});
    })
};


// deleteEmployee
exports.deleteEmployee = function (req, res, next) {

    userdb.getUserByEmpId(req.params.id, function (err, users, obj) {
        if (err) {
            return res.status(400).json({status: false, message: "failed", result: "something went wrong"});
        }
        if (users[0]) {
            user_roledb.deleteUserRoleByUserId(users[0].id, function (err, result, obj) {
                if (err) {
                    return res.status(400).json({status: false, message: "failed", result: "something went wrong"});
                }
                team_db.deleteUserTeamByUserId(users[0].id, function (err, result, obj) {
                    if (err) {
                        return res.status(400).json({status: false, message: "failed", result: "something went wrong"});
                    }
                    userdb.deleteUserByEmpId(req.params.id, function (err, result, obj) {
                        if (err) {
                            return res.status(400).json({
                                status: false,
                                message: "failed",
                                result: "something went wrong"
                            });
                        }
                        db.deleteEmployee(req.params.id, function (err, result, obj) {
                            if (err) {
                                return res.status(400).json({
                                    status: false,
                                    message: "failed",
                                    result: "something went wrong"
                                });
                            }
                            return res.status(200).json({status: true, message: "success", result: result});
                        })
                    });

                });

            });
        } else {
            db.deleteEmployee(req.params.id, function (err, result, obj) {
                if (err) {
                    return res.status(400).json({
                        status: false,
                        message: "failed",
                        result: "something went wrong"
                    });
                }
                return res.status(200).json({status: true, message: "success", result: result});
            })
        }
    });
};

