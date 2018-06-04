const Conversation = require('mongoose').model('Conversation');
const Message = require('mongoose').model('Message');
const response = require('../../utils/response');
const catchException = require('../../utils/catchException');

const newConversation = async (req, res, next) => {
  const send = response(res);

  try {
    const { userId } = req.user;
    const { recipientId } = req.params;
    const { message: messageBody } = req.body;

    if (!recipientId) {
      console.log('newConversation error: no recipient specified');
      send.error('You should choose a valid recipient', 422);
      return next();
    }

    if (!messageBody) {
      console.log('newConversation error: empty message');
      send.error('Message can\'t be empty', 422);
      return next();
    }

    const conversation = await Conversation.create({
      participants: [userId, recipientId],
    });

    const message = await Message.create({
      conversation: conversation._id,
      body: messageBody,
      author: userId,
    });

    send.json({
      message: 'Conversation started',
      conversationId: conversation._id,
    });

    return next();
  } catch (e) {
    return catchException('newConversation', e, send, next);
  }
};

module.exports = newConversation;
