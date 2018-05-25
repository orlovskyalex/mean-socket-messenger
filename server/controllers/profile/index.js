const router = require('express').Router();
const auth = require('../../middlewares/auth');

router.get('/', auth, require('./getProfile'));

module.exports = router;
