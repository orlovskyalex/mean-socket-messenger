const router = require('express').Router();

router.get('/', require('./getUserList'));
router.get('/:userId', require('./getUserById'));

module.exports = router;
