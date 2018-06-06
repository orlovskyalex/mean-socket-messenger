const passport = require('passport');
const response = require('../../utils/response');
const catchException = require('../../utils/catchException');

const signIn = (req, res) => {
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
  } catch (e) {
    return catchException('signIn', send, next, e);
  }
};

module.exports = signIn;
