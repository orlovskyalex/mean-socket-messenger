const User = require('mongoose').model('User');
const response = require('../../utils/response');

const getUserList = (req, res) => {
  const send = response(res);

  try {
    User.find()
      .select('_id name email')
      .exec((err, users) => {
        if (err) {
          throw new Error(err);
        }

        send.json({ users });
      });
  } catch ({ message }) {
    console.log('getUserList error:', message);
    send.error(message);
  }
};

module.exports = getUserList;
