const mongoose = require('mongoose');

require('../models/User');

let dbURI = 'mongodb://localhost/mean_chat';

if (process.env.NODE_ENV === 'production') {
  //dbURI = process.env.MONGODB_URI;
}

mongoose.connect(dbURI);

// CONNECTION EVENTS
mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${dbURI}`);
});
mongoose.connection.on('error', (err) => {
  console.log(`Mongoose connection error: ${err}`);
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});
