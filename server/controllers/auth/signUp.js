const User = require('mongoose').model('User');
const response = require('../../utils/response');
const capitalize = require('../../utils/capitalize');

const signUp = async (req, res) => {
  const send = response(res);

  try {
    if (!req.body || Object.keys(req.body).length < 3) {
      throw new Error('All fields are required!');
    }

    const { name, email, password } = req.body;

    let user = new User();

    user.name = {
      first: capitalize(name.first),
      last: capitalize(name.last),
    };
    user.email = email;

    user.setPassword(password);

    await user.save();
    send.json({ token: user.generateJwt() });
  } catch ({ code, message }) {
    const e = code === 11000 ? 'User already exists!' : message;
    console.log('sign up error:', e);
    send.error(e);
  }
};

module.exports = signUp;
