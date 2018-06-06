const mongoose = require('mongoose');
const crypto = require('crypto');
const privatePaths = require('mongoose-private-paths');
const jwt = require('jsonwebtoken');
const hash = require('../utils/hash');
const capitalize = require('../utils/capitalize');

// RFC 2822 compliant regex
const EMAIL_REGEX = /^(?!.*[\s])[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
const NAME_REGEX = /^([a-zA-Z]{2,})$/;
const PASSWORD_REGEX = /^(?!.*[\s])(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{7,}$/;

const userSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    match: EMAIL_REGEX,
    lowercase: true,
    required: true,
  },
  name: {
    first: {
      type: String,
      trim: true,
      match: NAME_REGEX,
      set: capitalize,
      required: true,
    },
    last: {
      type: String,
      trim: true,
      match: NAME_REGEX,
      set: capitalize,
      required: true,
    },
  },
  password: {
    type: String,
    match: PASSWORD_REGEX,
    required: true,
    private: true,
  },
  salt: {
    type: String,
    private: true,
  },
});

userSchema.pre('save', function hashPassword(next) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.password = hash(this.password, this.salt);
  next();
});

userSchema.methods.validatePassword = function (password) {
  return this.password === hash(password, this.salt);
};

userSchema.methods.generateJwt = function () {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    userId: this._id,
    exp: parseInt(expiry.getTime() / 1000),
  }, process.env.JWT_SECRET_KEY);
};

userSchema.plugin(privatePaths);

mongoose.model('User', userSchema);
