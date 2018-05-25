const passport = require('passport');
const response = require('../../utils/response');

const login = (req, res) => {
  const send = response(res);

  try {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        send.error(err, 404);
        return;
      }

      if (!user) {
        send.error(info, 401);
        return;
      }

      send.json({ token: user.generateJwt() });
    })(req, res);
  } catch ({ message }) {
    console.log('login error:', message);
    send.error(message);
  }
};

module.exports = login;
