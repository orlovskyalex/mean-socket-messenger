const User = require('mongoose').model('User');
const response = require('../../utils/response');

const getProfile = (req, res) => {
  const send = response(res);

  try {
    if (!req.jwt._id) {
      send.error('UnauthorizedError: private profile', 401);
    } else {
      User.findById(req.jwt._id).exec((err, user) => {
        if (err) {
          throw new Error(err);
        }

        send.json({ user });
      });
    }
  } catch ({ message }) {
    console.log('getProfile error:', message);
    send.error(message);
  }
};

module.exports = getProfile;
