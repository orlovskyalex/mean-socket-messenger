const router = require('express').Router();
const auth = require('../middlewares/auth');

router.use('/auth', require('./auth'));
router.use('/users', auth, require('./users'));
router.use('/messages', auth, require('./messages'));

module.exports = router;
