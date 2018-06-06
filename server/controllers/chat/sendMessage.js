const Conversation = require('mongoose').model('Conversation');
const Message = require('mongoose').model('Message');
const response = require('../../utils/response');
const catchException = require('../../utils/catchException');

const sendMessage = async (req, res, next) => {
  const send = response(res);
  const { userId } = req.user;
  const { conversationId } = req.params;
  const { message: messageBody } = req.body;

  if (!conversationId) {
    console.log('sendMessage error: no conversation id specified');
    send.error('You should specify a conversation id', 422);
    return next();
  }

  if (!messageBody) {
    console.log('sendMessage error: empty message');
    send.error('Message can\'t be empty', 422);
    return next();
  }

  try {
    const message = await Message.create({
      conversation: conversationId,
      body: messageBody,
      author: userId,
    });

    send.json({ message: 'Message sent' });
    return next();
  } catch (e) {
    return catchException('sendMessage', send, next, e);
  }
};

module.exports = sendMessage;
