class Team{
    constructor() {}

    validateTeamBody(req,res) {
        req.checkBody('name', '').notEmpty().withMessage("can not be empty");
    }

    // getAllTeam
    getAllTeam(result){
		return result
    }

    // getAllEmployeeByTeam
    getAllEmployeeByTeam(result){
        return result
    }

    // getTeamAndEmployee
    getTeamAndEmployee(result){
        return result
    }
}

module.exports = Team;
