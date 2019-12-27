class Leave {

    constructor() {}

    // registration code
    validateleaveBody(req, res) { // leave body param validation
        req.checkBody('dates').notEmpty().withMessage("date can not be empty");
        // req.checkBody('time').notEmpty().withMessage("time can not be empty");
        req.checkBody('cover_person_id').notEmpty().withMessage("cover_person_id can not be empty");
        req.checkBody('description').notEmpty().withMessage("description can not be empty");
    }

    // getAllLeavetype
    getAllLeavetype(result){
		return result
    }

    // getAllLeave
    getAllLeave(result){
		return result
    }

    // getAllLeaveByEmployeeId
    getAllLeaveByEmployeeId(result){
		return result
    }

    // getAllLeaveByEmployeeId2
    getAllLeaveByEmployeeId2(result){
      return result
    }

    // getAllLeaveByEmployeeId3
    getAllLeaveByEmployeeId3(result){
        return result
    }
    
}

module.exports = Leave;
