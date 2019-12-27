var router = express.Router();
var controll = require('./controller');

router.post('/companyholiday',controll.addcompanyholiday );
// router.get('/allCompanyHoliday', controll.getAllCompanyHoliday);
router.put('/:id',controll.updateHoliday);
router.delete('/:id',controll.deleteHoliday);
router.get('/holiday_name',controll.getAllCompanyHoliday);
router.get('/holiday_id',controll.getAllCompanyHolidayById);
router.get('/holiday_date',controll.getAllDateCompanyHoliday);
router.get('/viewholiday',controll.viewCompanyHoliday);


module.exports=router;
