const router = require('express').Router();

router.get('/', require('./getConversationList'));
router.get('/:conversationId/messages', require('./getMessageList'));
router.post('/:conversationId/messages', require('./sendMessage'));
router.get('/new/:recipientId', require('./checkExistingConversation'));
router.post('/new/:recipientId', require('./newConversation'));

module.exports = router;
