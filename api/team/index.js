var router = express.Router();
var controll = require('./controller');

router.post('/addteam',controll.addteam);
router.get('/all', controll.getAllTeam);
router.get('/:team_id', controll.getAllEmployeeByTeam);
router.put('/:id', controll.updateTeam );
router.delete('/:id', controll.deleteTeam);

module.exports=router;
