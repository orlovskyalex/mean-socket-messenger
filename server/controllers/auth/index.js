const router = require('express').Router();

router.post('/sign-up', require('./signUp'));
router.post('/login', require('./login'));

module.exports = router;
