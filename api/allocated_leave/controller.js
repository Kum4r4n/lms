'use strict';
var db = require('../../database/mysql/allocated_leave');
var Allocated = require('./class');
var allocated_leave = new Allocated();

// add Allocated Leave
exports.addAllocatedLeave = function (req, res, next) {
    allocated_leave.validateAllocatedBody(req);
    var reqBodyResult = appFun.reqBodyValidation(req, res);
    if (reqBodyResult != null) return res.status(400).json({status: false, message: "failed", result: reqBodyResult});

    db.addAllocatedLeave(req.body, function (err, result) {
        if (err) {
            return res.status(400).json({status: false, message: "failed", result: result});
        }
        return res.status(200).json({status: true, message: "success", result: "allocated leave added"});
    });

};



exports.autoAllocateLeave = function (req, res, next) {
    var reqBodyResult = appFun.reqBodyValidation(req, res);
    var obj = req.body;

    if (reqBodyResult != null) return res.status(400).json({status: false, message: "failed", result: reqBodyResult});

    db.autoAllocateLeave(obj,function (err, result, obj) {
        if (err && obj.allocated.start > 1 && obj.allocated.start < 12 && obj.allocated.end > 1 && obj.allocated.end < 12 ) {
            return res.status(400).json({status: false, message: "failed", result: result });
        }
        else {
            return res.status(200).json({status: true, message: "success", result: "Leave Allocate ok"});
        }
    });
};

exports.showAutoAllocateLeave = function (req, res, next) {
    var leave_type_id = null;
    db.showAutoAllocateLeave(leave_type_id, function (err, result, obj) {
        if (err) {
            return res.status(400).json({status: false, message: "failed", result: "something went wrong"});
        }
        return res.status(200).json({status: true, message: "success", result: result});

    })
};

// get All Leave Summary
exports.getAllLeaveSummary = function (req, res, next) {

    db.getAllLeaveSummary(req.params, function (err, result, obj) {
        if (err) {
            return res.status(400).json({status: false, message: "failed", result: "Something is wrong"});
        }
        return res.status(200).json({
            status: true,
            message: "success",
            result: allocated_leave.getAllocatedLeave(result)
        });
    });

};

// get Allocated Leave
exports.getAllocatedLeave = function (req, res, next) {

    db.getAllocatedLeave(req.params.employee_id, function (err, result, obj) {
        if (err) {
            return res.status(400).json({status: false, message: "failed", result: "wrong"});
        }
        return res.status(200).json({
            status: true,
            message: "success",
            result: allocated_leave.getAllocatedLeave(result)
        });
    });

};

//  update allocated_leave detail
exports.updateAllocatedLeaveDetail = function (req, res, next) {

    db.updateAllocatedLeaveDetail(result[0].id, function (err, result, obj) {
        if (err) {
            return res.status(400).json({status: false, message: "failed", result: err});
        }
        return res.status(200).json({status: true, message: "success", result: result});

    })
};

//  update allocated_leave detail when cancel
exports.updateAllocatedLeaveCancelDetail = function (req, res, next) {

    db.updateAllocatedLeaveCancelDetail(result[0].id, function (err, result, obj) {
        if (err) {
            return res.status(400).json({status: false, message: "failed", result: err});
        }
        return res.status(200).json({status: true, message: "success", result: result});

    })
};



exports.getAllAutoAllocateLeave = function (req,res,next) {

    db.getAllAutoAllocateLeave(req, function (err, result, obj) {
        if (err) {
            return res.status(400).json({
                status: false,
                message: "failed",
                result: "wrong"});

        }
        return res.status(200).json({
            status: true,
            message: "success",
            result: allocated_leave.getAllAutoAllocateLeave(result)
        });
    });


};


exports.getAllAutoAllocateLeaveByMonth = function (req,res,next) {

    db.getAllAutoAllocateLeaveByMonth(req, function (err, result, obj) {
        if (err) {
            return res.status(400).json({
                status: false,
                message: "failed",
                result: "wrong"});

        }
        return res.status(200).json({
            status: true,
            message: "success",
            result: allocated_leave.getAllAutoAllocateLeaveByMonth(result)
        });
    });


};

exports.updateAutoAllocatedLeave = function (req,res,next) {

    db.updateAutoAllocateLeave(req.body, function (err, result, obj) {

        if (err && obj.allocated.start > 1 && obj.allocated.start < 12 && obj.allocated.end > 1 && obj.allocated.end < 12) {
            return res.status(400).json({status: false, message: "failed", result:err});
        }
        return res.status(200).json({status: true, message: "success", result: result});
    });
};

