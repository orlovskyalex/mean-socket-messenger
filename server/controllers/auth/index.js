const router = require('express').Router();

router.post('/register', require('./register'));
router.post('/login', require('./login'));

module.exports = router;
