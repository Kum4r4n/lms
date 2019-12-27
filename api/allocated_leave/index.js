let router = express.Router();
let ctrl = require('./controller');

router.post('/add', ctrl.addAllocatedLeave);
router.get('/all', ctrl.getAllLeaveSummary);

router.put('/updateAutoAllocateLeave', ctrl.updateAutoAllocatedLeave);
router.get('/getAllAutoAllocateLeave/', ctrl.getAllAutoAllocateLeave);
// router.put('/autoAllocateLeave/editLeave/:leaveTypeId',ctrl.editAutoAllocateLeave);
router.get('/:employee_id', ctrl.getAllocatedLeave);
router.put('/:id', ctrl.updateAllocatedLeaveDetail);
router.put('/cancel/:id', ctrl.updateAllocatedLeaveCancelDetail);
router.post('/autoAllocateLeave',ctrl.autoAllocateLeave);
router.get('/auto/getAllAutoAllocateLeaveByMonth',ctrl.getAllAutoAllocateLeaveByMonth);



module.exports = router;
