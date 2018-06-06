const User = require('mongoose').model('User');
const response = require('../../utils/response');
const catchException = require('../../utils/catchException');

const getUserList = async (req, res, next) => {
  const send = response(res);

  try {
    const users = await User.find().select('-__v');
    send.json({ users });
  } catch (e) {
    return catchException('getUserList', send, next, e);
  }
};

module.exports = getUserList;
