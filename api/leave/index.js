let router = express.Router();
let ctrl = require('./controller');

router.post('/addleave', ctrl.addleave);
router.get('/leavetype', ctrl.getAllLeavetype);
router.get('/all', ctrl.getAllLeave);
router.get('/employee', ctrl.getAllLeaveByEmployeeId);
router.get('/employee/:employee_id', ctrl.getAllLeaveByEmployeeId2);
router.get('/employee/:employee_id', ctrl.getAllLeaveByEmployeeId3);
router.put('/reason/:id', ctrl.reasonForReject);
router.put('/cancel/:id', ctrl.cancelLeave);
router.put('/cover/:id', ctrl.coverPersonLeaveStatus);
router.put('/accept/:id', ctrl.acceptLeave);
router.put('/reject/:id', ctrl.rejectLeave);

module.exports = router;
