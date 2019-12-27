'use strict';
var db = require('../../database/mysql/user');
// var user_roledb = require('../../database/mysql/user_role');
var User = require('./class');
var mail = require('../../app/email/sendMail');
var user = new User();


// login
exports.login = function (req, res, next) {
    user.validateLoginBody(req);
    var reqBodyResult = appFun.reqBodyValidation(req, res);
    if (reqBodyResult != null) return res.status(400).json({status: false, message: "Failed", result: reqBodyResult});
    db.login(req.body.email, req.body.password, function (err, result) {
        if (err) return res.status(400).json({status: false, message: result, result: result});
        db.privilege(result[0].id, (err, privilegeResult, cbData) => {
            if (err) return res.status(400).json({status: false, message: "Failed", result: "Privilege error"});
            return res.status(200).json({
                status: true,
                message: "success",
                result: user.loginResponse(req, result[0], privilegeResult)
            });
        });
    });
};


// register
exports.register = function (req, res, next) {
    user.validateRegistrationBody(req);
    var reqBodyResult = appFun.reqBodyValidation(req, res);
    if (reqBodyResult != null) return res.status(400).json({status: false, message: "failed", result: reqBodyResult});

    db.registration(req.body, function (err, result) {
        if (err) {
            return res.status(400).json({status: false, message: "failed", result: result});
        }
        return res.status(200).json({status: true, message: "Registration Success", result: "registration success"});
    });
};


// get all user
exports.getAllUsers = function (req, res, next) {

    db.getAllUser(req.params, function (err, result, obj) {
        if (err) {
            return res.status(400).json({status: false, message: "failed", result: "something went wrong"});
        }
        return res.status(200).json({status: true, message: "success", result: result});

    })

};


// changePassword
exports.changePassword = function (req, res, next) {
    user.validateChangePasswordBody(req);
    var reqBodyResult = appFun.reqBodyValidation(req, res);
    if (reqBodyResult != null) return res.status(400).json({status: false, message: "failed", result: reqBodyResult});

    var password = appFun.encryptPassword(req.body.password);
    console.log(password);
    db.changePassword(req.body.email, password, function (err, result, obj) {
        if (err) {
            return res.status(400).json({status: false, message: result, result: result});
        }
        return res.status(200).json({status: true, message: "success", result: result});
    });
};


// forgetPassword
exports.forgetPassword = function (req, res, next) {
    user.validateEmailLoginBody(req);
    var reqBodyResult = appFun.reqBodyValidation(req, res);
        if (reqBodyResult != null) return res.status(400).json({status: false, message: "failed", result: reqBodyResult});
    var generatedPassword = appFun.genarateRandoString(6);
    console.log(generatedPassword);

    var password = appFun.encryptPassword(generatedPassword);
    db.getUserByEmail(req.body.email,(err,result,obj)=>{
        if (err) {
            return res.status(400).json({status: false, message: result, result: result});
        }
        if(result.length == 0){
            return res.status(400).json({status: false, message: "There is no user with this email", result: "There is no user with this email"});
        }
    db.forgetPassword(req.body.email, password, function (err, result, obj) {
        if (err) {
            return res.status(400).json({status: false, message: result, result: result});
        }
        let message = `
<html>
<head>
</head>
<body style="background-color: #f4f4f5;">
    <table align="center" cellpadding="0" cellspacing="0" style="background-color: #fff; width: 100%; max-width: 680px; height: 100%;"> 
        <tbody> 
            <tr> 
                <td> 
     <table cellpadding="0" cellspacing="0" style="padding: 10px 80px 50px 80px;">
        <tbody>
            <tr>
                <td style="padding-top: 24px;">
                    <img src="https://media.licdn.com/dms/image/C510BAQF6wyCzdoym6Q/company-logo_200_200/0?e=2159024400&v=beta&t=6-THeyi1gNiwGRsy6u2LpFSGtyJBtwXtxq83zdqM-D0" style="width: 56px;"> 
                </td> 
            </tr> 
            <tr> 
                <td colspan="2" style="padding: 30px 0 30px 0; font-size: 40px; font-weight: 600;">
                    <u>Reset your password</u>
                </td>
            </tr> 
            <tr>
                <td style="color: #9095a2; font-size: 16px; font-weight: 400; "> 
                        You're receiving this new password, because you requested a password reset for your Leave Management account by 
                        <b>" ${req.body.email} "</b>'s e-mail. 
                </td>
            </tr> 
            <tr> 
                <td style="padding-top: 24px;color: #9095a2; font-size: 16px; font-weight: 400; ">
                    Please use this new password.
                </td>
            </tr>
            <tr>
                <td>
                    <h4 style="margin-top: 36px; color: #000;  font-size: 25px; font-weight: 600; letter-spacing: 0.7px; line-height: 40px; width: 140px; 
                      background-color: #fff; border: 3px solid #009688; border-radius: 5px; text-align: center;"> 
                        ${generatedPassword} 
                    </h4>
                </td>
            </tr> 
        </tbody> 
    </table> 
                </td> 
            </tr>
        </tbody>
    </table> 
</body> 
</html> `;

        mail.sendMail(req.body.email, 'Reset Password',
            message, (err, result) => {
            });
        return res.status(200).json({status: true, message: "success", result: 'password going to change'});
    });
    });
};


// uploadProfilePicture
exports.uploadProfilePicture = function (req, res, next) {
    return res.status(200).json({status: true, message: "success", result: 'hello'});
};
