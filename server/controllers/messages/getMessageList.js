const Message = require('mongoose').model('Message');
const response = require('../../utils/response');

const getMessageList = async (req, res) => {
  const send = response(res);

  try {
    const { user: { userId } } = req;

    const messages = await Message.find({
        $or: [
          { sender: userId },
          { receiver: userId },
        ],
      })
      .populate('sender', '_id name email')
      .populate('receiver', '_id name email')
      .exec();

    send.json({ messages });
  } catch ({ message }) {
    console.log('getMessageList error:', message);
    send.error(message);
  }
};

module.exports = getMessageList;
