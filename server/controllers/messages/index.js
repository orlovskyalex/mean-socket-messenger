const router = require('express').Router();

router.get('/:recipientId', require('./getMessageList'));

module.exports = router;
