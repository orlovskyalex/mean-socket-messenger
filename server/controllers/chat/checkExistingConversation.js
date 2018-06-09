const Conversation = require('mongoose').model('Conversation');
const response = require('../../utils/response');
const catchException = require('../../utils/catchException');

const checkExistingConversation = async (req, res, next) => {
  const send = response(res);

  try {
    const { userId } = req.user;
    const { recipientId } = req.params;

    if (!recipientId) {
      console.log('checkExistingConversation error: no recipientId specified');
      send.error('You should specify recipientId', 422);
      return next();
    }

    const conversation = await Conversation.findOne({ participants: [userId, recipientId] })
      .select('participants')
      .populate('participants', 'name')
      .exec();

    send.json({ conversation });
  } catch (e) {
    return catchException('checkExistingConversation', send, next, e);
  }
};

module.exports = checkExistingConversation;
