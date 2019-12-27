class Employee {

	constructor() { }

	// registration code
	// validate Registration Body
	validateRegistrationBody(req, res) { // register body param validation
		req.checkBody('employee_number', 'Invalid employeenumber').notEmpty().withMessage("employeenumber can not be empty");
		req.checkBody('first_name', 'Invalid firstname').notEmpty().withMessage("firstname can not be empty");
		req.checkBody('last_name', 'Invalid lastname').notEmpty().withMessage("lastname can not be empty");
		req.checkBody('email', 'Invalid email').notEmpty().withMessage("email can not be empty");
		req.checkBody('nic_no', 'Invalid nicno').notEmpty().withMessage("nicno can not be empty");
		req.checkBody('dob', 'Invalid dob').notEmpty().withMessage("dob can not be empty");
		req.checkBody('nationality', '').notEmpty().withMessage(" can not be empty");
		req.checkBody('marital_status', '').notEmpty().withMessage(" can not be empty");
		req.checkBody('position', '').notEmpty().withMessage(" can not be empty");
		req.checkBody('joinDate', 'Invalid joinDate').notEmpty().withMessage("joinDate can not be empty");
		req.checkBody('telephone_number', '').notEmpty().withMessage(" can not be empty");
		req.checkBody('mobile_number', '').notEmpty().withMessage(" can not be empty");
		req.checkBody('permanent_address', '').notEmpty().withMessage(" can not be empty");
		req.checkBody('current_address', '');
		req.checkBody('emergency_contact_name', '').notEmpty().withMessage("can not be empty");
		req.checkBody('emergency_contact_number', '').notEmpty().withMessage("can not be empty");
		req.checkBody('emergency_contact_relationship', '').notEmpty().withMessage("can not be empty");
		// req.checkBody('bank_name', '').notEmpty().withMessage("can not be empty");
		// req.checkBody('account_holder', '').notEmpty().withMessage("can not be empty");
		// req.checkBody('account_no', '').notEmpty().withMessage("can not be empty");
		// req.checkBody('branch', '').notEmpty().withMessage("can not be empty");
		// req.checkBody('type_of_account', '').notEmpty().withMessage("can not be empty");
		req.checkBody('isCreateAccount', '').notEmpty().withMessage("can not be empty");
	}

	// get All Employee
	getAllEmployee(result){
		return result
	}

	// updateEmployeeDetail
    updateEmployeeDetail(result){
		return result
	}

	// update Profile
	updateProfile(result){
		return result
	}
}

module.exports = Employee;
