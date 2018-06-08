const User = require('mongoose').model('User');
const response = require('../../utils/response');
const catchException = require('../../utils/catchException');

// TODO: implement pagination
const getUserList = async (req, res, next) => {
  const send = response(res);

  try {
    let condition = {};

    let { name } = req.query;

    if (name) {
      if (name.length < 2) {
        console.log('getUserList error: name query is too short');
        send.error('Name query should be at least two characters long', 422);
        return next();
      }

      name = new RegExp(name, 'i');
      condition = {
        $or: [
          { 'name.first': { $regex: name } },
          { 'name.last': { $regex: name } },
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
