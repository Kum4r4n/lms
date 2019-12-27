'use strict';
var db = require('../../database/mysql/team')
var Team = require('./class')
var team = new Team();

// addteam
exports.addteam =function(req, res, next){
	team.validateTeamBody(req);
	var reqBodyResult = appFun.reqBodyValidation(req,res);
	if(reqBodyResult != null) return res.status(400).json({status: false, message: "failed", result: reqBodyResult});

	db.addteam(req.body ,function (err,result){
		if (err){
			return res.status(400).json({status: false, message: "failed",result:result});
		}
		return res.status(200).json({status:true, message: "success",result:"team name added"});
	});

};

// getAllTeam
exports.getAllTeam = function (req, res, next) {
	db.getAllTeam(function (err, result, obj) {
		if (err) {
			return res.status(400).json({ status: false, message: "failed", result: "something went wrong" });
		}
		return res.status(200).json({ status: true, message: "success", result: team.getAllTeam(result) });

	})
};

// getTeamAndEmployee
exports.getTeamAndEmployee = function (req, res, next) {

	db.getTeamAndEmployee(function (err, result, obj) {
		if (err) {
			return res.status(400).json({ status: false, message: "failed", result: "something went wrong" });
		}
		return res.status(200).json({ status: true, message: "success", result: team.getTeamAndEmployee(result) });

	})
};

// getAllEmployeeByTeam
exports.getAllEmployeeByTeam  = function (req, res, next) {

	db.getAllEmployeeByTeam (req.params.team_id,function (err, result, obj) {
		if (err) {
			return res.status(400).json({ status: false, message: "failed", result: "something went wrong" });
		}
		return res.status(200).json({ status: true, message: "success", result: team.getAllEmployeeByTeam(result) });
	})
};

// delete team
exports.deleteTeam   = function (req, res, next) {

	db.deleteTeam  (req.params.id,  function (err, result, obj) {
		if (err) {
			return res.status(400).json({ status: false, message: "failed", result: "something went wrong" });
		}
		return res.status(200).json({ status: true, message: "success", result: result });
	})
};

// update team
exports.updateTeam    = function (req, res, next) {

	db.updateTeam   (req.params.id,req.body,  function (err, result, obj) {
		if (err) {
			return res.status(400).json({ status: false, message: "failed", result: "something went wrong" });
		}
		return res.status(200).json({ status: true, message: "success", result: result });
	})
};

