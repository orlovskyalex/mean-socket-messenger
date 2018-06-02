const mongoose = require('mongoose');
const { Schema } = mongoose;

const messageSchema = Schema({
  sender: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  recipient: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  sentAt: {
    type: Date,
    required: true,
  },
});

messageSchema.statics.new = async function (data) {
  const message = await this.create({
    ...data,
    sentAt: new Date(),
  });

  return this.populate(message, 'sender recipient');
};

mongoose.model('Message', messageSchema);
