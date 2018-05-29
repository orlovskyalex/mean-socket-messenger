const router = require('express').Router();
const auth = require('../../middlewares/auth');

router.get('/:userId', auth, require('./getUser'));

module.exports = router;
