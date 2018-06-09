const User = require('mongoose').model('User');
const response = require('../../utils/response');
const catchException = require('../../utils/catchException');

// TODO: implement pagination
const getUserList = async (req, res, next) => {
  const send = response(res);

  try {
    let condition = {};

    const { name } = req.query;

    if (name) {
      const nameRegex = new RegExp(name, 'i');

      condition = {
        $or: [
          { 'name.first': { $regex: nameRegex } },
          { 'name.last': { $regex: nameRegex } },
        ],
      };
    }

    const users = await User.find(condition).select('-__v');

    send.json({ users });
  } catch (e) {
    return catchException('getUserList', send, next, e);
  }
};

module.exports = getUserList;
