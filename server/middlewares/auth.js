const jwt = require('express-jwt');

const auth = jwt({
  secret: process.env.JWT_SECRET_KEY,
  userProperty: 'user',
});

module.exports = auth;
