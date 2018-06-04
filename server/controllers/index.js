const router = require('express').Router();
const auth = require('../middlewares/auth');

router.use('/auth', require('./auth'));
router.use('/users', auth, require('./users'));
router.use('/chat', auth, require('./chat'));

module.exports = router;
