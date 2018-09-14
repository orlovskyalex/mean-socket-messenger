const Conversation = require('mongoose').model('Conversation');
const Message = require('mongoose').model('Message');
const response = require('../../utils/response');
const catchException = require('../../utils/catchException');

const getConversationList = async (req, res, next) => {
  const send = response(res);

  try {
    const { userId } = req.user;

    const conversations = await Conversation.find({ participants: userId })
      .populate('participants', 'name')
      .exec();

    send.json({ conversations });

    return next();
  } catch (e) {
    return catchException('getAllConversations', send, next, e);
  }
};

module.exports = getConversationList;
