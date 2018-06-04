const mongoose = require('mongoose');
const { Schema } = mongoose;

const conversationSchema = Schema({
  participants: [
    {
      type: Schema.ObjectId,
      ref: 'User',
    },
  ],
});

mongoose.model('Conversation', conversationSchema);
