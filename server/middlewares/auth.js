const jwt = require('express-jwt');

const auth = jwt({
  secret: process.env.JWT_SECRET_KEY,
  userProperty: 'jwt',
});

module.exports = auth;
