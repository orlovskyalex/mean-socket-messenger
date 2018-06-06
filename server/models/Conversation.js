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

conversationSchema.statics.findOneOrCreate = function (condition) {
  return this.findOne(condition).then(conversation => {
    return conversation ? conversation : this.create(condition);
  });
};

mongoose.model('Conversation', conversationSchema);
