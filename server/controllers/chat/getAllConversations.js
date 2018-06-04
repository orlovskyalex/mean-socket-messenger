const Conversation = require('mongoose').model('Conversation');
const Message = require('mongoose').model('Message');
const response = require('../../utils/response');
const catchException = require('../../utils/catchException');

const getAllConversations = async (req, res, next) => {
  const send = response(res);

  try {
    const { userId } = req.user;

    const conversations = await Conversation.find({ participants: userId })
      .select('participants')
      .populate('participants', 'name')
      .exec();

    return send.json({ conversations });
  } catch (e) {
    return catchException('getAllConversations', e, send, next);
  }
};

module.exports = getAllConversations;
