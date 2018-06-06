const mongoose = require('mongoose');
const { Schema } = mongoose;

const conversationSchema = Schema({
  participants: {
    type: [
      {
        type: Schema.ObjectId,
        ref: 'User',
      },
    ],
    required: true,
  },
});

conversationSchema.statics.findOneOrCreate = function (condition) {
  return this.findOne(condition).then(conversation => {
    return conversation ? conversation : this.create(condition);
  });
};

mongoose.model('Conversation', conversationSchema);
