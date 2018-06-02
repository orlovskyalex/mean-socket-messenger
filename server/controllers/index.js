const router = require('express').Router();
const auth = require('../middlewares/auth');

router.use('/auth', require('./auth'));
router.use('/users', auth, require('./users'));

module.exports = router;
