const crypto = require('crypto');

const hash = (password, salt, iterations = 1000, keylen = 64, digest = 'sha512') => {
  return crypto.pbkdf2Sync(password, salt, iterations, keylen, digest).toString('hex');
};

module.exports = hash;
