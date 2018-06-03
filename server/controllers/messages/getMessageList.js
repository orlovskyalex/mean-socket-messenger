const Message = require('mongoose').model('Message');
const response = require('../../utils/response');

const getMessageList = async (req, res) => {
  const send = response(res);

  try {
    const { user: { userId } } = req;
    const { recipientId } = req.params;

    const messages = await Message.find({
        $or: [
          {
            sender: userId,
            recipient: recipientId,
          },
          {
            sender: recipientId,
            recipient: userId,
          },
        ],
      })
      .sort({ sentAt: 'asc' })
      .populate('sender', '_id name email')
      .populate('recipient', '_id name email')
      .exec();

    send.json({ messages });
  } catch ({ message }) {
    console.log('getMessageList error:', message);
    send.error(message);
  }
};

module.exports = getMessageList;
