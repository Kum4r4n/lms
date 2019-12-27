let router = express.Router();
let ctrl = require('./controller');

router.get('/all', ctrl.getAllUsers);
router.post('/login', ctrl.login);
router.post('/register', ctrl.register);
router.post('/upload_profile', ctrl.uploadProfilePicture);
router.put('/forgetPassword', ctrl.forgetPassword);
router.put('/changePassword', ctrl.changePassword);
module.exports = router;
