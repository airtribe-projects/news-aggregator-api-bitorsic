const router = require('express').Router();
const controller = require('../controllers/newsController');
const verifyToken = require('../middleware/verifyToken');


router.get('/', verifyToken, controller.getNews);

module.exports = router;