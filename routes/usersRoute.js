const router = require('express').Router();
const controller = require('../controllers/usersController');
// const verifyToken = require('../middleware/verifyToken');

router.post('/signup', controller.signup);
router.post('/login', controller.login);

module.exports = router;