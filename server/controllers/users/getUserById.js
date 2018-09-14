const User = require('mongoose').model('User');
const response = require('../../utils/response');
const catchException = require('../../utils/catchException');

const getUserById = async (req, res, next) => {
  const send = response(res);

  try {
    const { userId } = req.params;

    if (!userId) {
      console.log('getUserById error: no userId specified');
      send.error('You should specify userId', 422);
      return next();
    }

    const user = await User.findById(userId).select('-__v');

    send.json({ user });

    return next();
  } catch (e) {
    return catchException('getUserById', send, next, e);
  }
};

module.exports = getUserById;
