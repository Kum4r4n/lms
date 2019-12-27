'use strict';
const nodemailer = require('nodemailer');
const helper = require('sendgrid').mail;

// Generate test SMTP service account from ethereal.email
// Only needed if you don't have a real mail account for testing


// send mail
exports.sendMail = function (email, subject, message, cb) {
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'leavemanage2020@gmail.com',
            pass: 'leave@system@20'
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: 'noreply@ceybit.net', // sender address
        to: email, // list of receivers
        cc:'leavemanage2020@gmail.com',
        subject: subject, // Subject line
        // text: 'Hello world?', // plain text body
        html: message // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.info(error)
            return cb(true, error)
        }
        return cb(false, info);
    });
} ;
