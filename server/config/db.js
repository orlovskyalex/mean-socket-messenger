const mongoose = require('mongoose');

require('../models/User');
require('../models/Message');
require('../models/Conversation');

let dbURI = 'mongodb://localhost/mean_chat';

if (process.env.NODE_ENV === 'production') {
  const {MONGODB_USER, MONGODB_PASSWORD, MONGODB_ADDRESS} = process.env;
  dbURI = `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_ADDRESS}`;
}

mongoose.connect(dbURI);

// CONNECTION EVENTS
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to mongodb');
});
mongoose.connection.on('error', (err) => {
  console.log(`Mongoose connection error: ${err}`);
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});
