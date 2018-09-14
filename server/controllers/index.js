const router = require('express').Router();
const auth = require('../middlewares/auth');

router.use('/auth', require('./auth'));
router.use('/users', auth, require('./users'));
router.use('/conversations', auth, require('./conversations'));

module.exports = router;
