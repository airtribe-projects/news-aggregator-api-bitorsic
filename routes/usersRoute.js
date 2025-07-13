const router = require('express').Router();
const controller = require('../controllers/usersController');
const verifyToken = require('../middleware/verifyToken');

router.post('/signup', controller.signup);
router.post('/login', controller.login);

router.get('/preferences', verifyToken, controller.getPreferences);
router.put('/preferences', verifyToken, controller.putPreferences);

module.exports = router;