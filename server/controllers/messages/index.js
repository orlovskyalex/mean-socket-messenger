const router = require('express').Router();
const auth = require('../../middlewares/auth');

router.get('/', auth, require('./getMessageList'));
//router.post('/', auth, require('./saveMessage'));

module.exports = router;
