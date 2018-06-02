const router = require('express').Router();
const auth = require('../../middlewares/auth');

router.get('/', auth, require('./getUserList'));
router.get('/:userId', auth, require('./getUserById'));

module.exports = router;
