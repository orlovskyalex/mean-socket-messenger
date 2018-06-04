const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = Schema(
  {
    conversation: {
      type: Schema.ObjectId,
      ref: 'Conversation',
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

mongoose.model('Message', messageSchema);
