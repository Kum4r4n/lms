
'use strict';
module.exports = function(app) {
    var auth = require('./validateRequest');
    // app.all('/api/v1/*', [require('./middlewares/validateRequest')]);
    app.use( config.baseUrl + '/user', require('../api/user/index')); //user related Api    
    app.use( config.baseUrl + '/employee',require('./validateRequest'), require('../api/employee/index')); //employee related Api  
    app.use( config.baseUrl + '/leave',require('./validateRequest'), require('../api/leave/index')); //leave related Api 
    app.use( config.baseUrl + '/team', require('./validateRequest'),require('../api/team/index')); //team related Api 
    app.use( config.baseUrl + '/companyholiday',require('./validateRequest'), require('../api/companyholiday/index')); //company_holiday related Api 
    app.use( config.baseUrl + '/allocated_leave',require('./validateRequest'), require('../api/allocated_leave/index')); //allocated leave related Api 

}
