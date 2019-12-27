var router = express.Router();
var controll = require('./controller');

router.post('/add', controll.add);
router.get('/all', controll.getAllEmployee);
router.get('/:id', controll.getEmployeeById);
router.put('/:id',controll.updateEmployeeDetail);
router.delete('/:id',controll.deleteEmployee);
router.put('/profile/:id',controll.updateProfile);

// router.get('/allemail', controll.getemployee);

module.exports = router;
