class Allocated {

    constructor() {}

    validateAllocatedBody(req, res) {
        req.checkBody('employee_id', '').notEmpty().withMessage("can not be empty");
    }

    // validateAllocatedleaveBody(req, res) { // allocated leave body param validation
    //     req.checkBody('start', '').notEmpty().withMessage("start can not be empty");
    //     req.checkBody('end', '').notEmpty().withMessage("end can not be empty");
    //     req.checkBody('annual', '').notEmpty().withMessage("annual can not be empty");
    // }

    getAllocatedLeave(result) {
        return result
    }

    getAllAutoAllocateLeave(result){
        return result;
    }

    getAllAutoAllocateLeaveByMonth(result){
        return result;
    }

}

module.exports = Allocated;
