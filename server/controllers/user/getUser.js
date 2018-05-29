const User = require('mongoose').model('User');
const response = require('../../utils/response');

const getUser = (req, res) => {
  const send = response(res);

  try {
    const { userId } = req.params;

    if (!userId) {
      send.error('UnauthorizedError: private profile', 401);
    } else {
      User.findById(userId)
        .select('_id name email')
        .exec((err, user) => {
          if (err) {
            throw new Error(err);
          }

          send.json({ user });
        });
    }
  } catch ({ message }) {
    console.log('getUser error:', message);
    send.error(message);
  }
};

module.exports = getUser;
