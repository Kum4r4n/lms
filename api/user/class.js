class User {

    constructor() {}

    validateLoginBody(req, res) { // login body param validation
        req.checkBody('email', 'Invalid email').notEmpty().withMessage("email can not be empty");
        req.checkBody('password', 'Invalid password').notEmpty().withMessage("password can not be empty");
    }

    validateEmailLoginBody(req) { // login body param validation
        req.checkBody('email', 'Invalid email').notEmpty().withMessage("Plz enter valid mail address");
    }

    loginResponse(req, data, privilege) {
        var user = {
            id: data.id,
            email: data.email,
            role_id: privilege[0].role_id,
            employee_id: data.employee_id,
            profile: data.profile,
            browser: req.useragent.browser + '_' + req.useragent.version,
            ip: req.connection.remoteAddress
        };

        var name = (data.first_name !== undefined && data.last_name !== undefined) ? data.first_name + " " + data.last_name : data.email;
        return {
            token: appFun.jwtToken(user),
            privilege: privilege,
            eId: data.employee_id,
            uId: data.id,
            active: data.active,
            role_id: privilege[0].role_id,
            status: data.status,
            name: name,
        }
    }

    loginResponseOnlyEmail(req, data) {
        var user = {
            uId: data.id,
            eId: data.employee_id,
            browser: req.useragent.browser + '_' + req.useragent.version,
            ip: req.ip
        };
        return {
            token: appFun.jwtToken(user),
            eId: data.employee_id,
            uId: data.id,
        }
    }

    validateChangePasswordBody(req, res) {
        req.checkBody('password', 'Invalid password').notEmpty().withMessage("password can not be empty");
    }

    // registration code
    validateRegistrationBody(req, res) { // login body param validation
        req.checkBody('email', 'Invalid email').notEmpty().withMessage("email can not be empty");
        req.checkBody('password', 'Invalid password').notEmpty().withMessage("password can not be empty");
    }
}


module.exports = User;
