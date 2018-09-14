const User = require('mongoose').model('User');
const response = require('../../utils/response');
const catchException = require('../../utils/catchException');

const signUp = async (req, res, next) => {
  const send = response(res);

  try {
    if (!req.body || Object.keys(req.body).length < 3) {
      console.log('signUp error: All fields are required!');
      send.error('All fields are required!', 422);
      return next();
    }

    const user = await new User(req.body).save();

    send.json({ token: user.generateJwt() });

    return next();
  } catch (e) {
    let errToSend;

    if (e.code === 11000) {
      errToSend = 'User already exists';
    }

    return catchException('signUp', send, next, e, errToSend);
  }
};

module.exports = signUp;
