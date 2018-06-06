const Message = require('mongoose').model('Message');
const response = require('../../utils/response');
const catchException = require('../../utils/catchException');

const getConversation = async (req, res, next) => {
  const send = response(res);
  const { conversationId } = req.params;

  if (!conversationId) {
    console.log('getConversation error: no conversation id specified');
    send.error('You should specify a conversation id', 422);
    return next();
  }

  try {
    const messages = await Message.find({ conversation: conversationId })
      .select('body author createdAt')
      .sort('createdAt')
      .populate('author', 'name')
      .exec();

    send.json({ conversation: { messages } });
  } catch (e) {
    return catchException('getConversation', send, next, e);
  }
};

module.exports = getConversation;
