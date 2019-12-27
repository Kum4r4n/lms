class CompanyHoliday {

    constructor(){}

    // validate company Holiday Body
    validatecompanyHolidayBody(req,res){
        req.checkBody('type_of_holiday_id', '').notEmpty().withMessage("holiday type can not be empty");
        req.checkBody('holiday_date', '').notEmpty().withMessage("holiday date can not be empty");
    }

    // get All Company Holiday By Id
    getAllCompanyHolidayById(result){
      return result
    }

    // get All Company Holiday
    getAllCompanyHoliday(result){
		return result
    }

    // get All Date Company Holiday
    getAllDateCompanyHoliday(result){
      return result
    }

    // view Company Holiday
    viewCompanyHoliday(result){
        return result;
    }

    // delete Holiday
    deleteHoliday(result){
        return result;
    }

    // update Holiday
    updateHoliday(result){
        return result;
    }

}

module.exports = CompanyHoliday;
