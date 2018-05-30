const router = require('express').Router();

router.post('/sign-up', require('./signUp'));
router.post('/sign-in', require('./signIn'));

module.exports = router;
