const mongoose = require('mongoose');
const { Schema } = mongoose;
const findOneOrCreate = require('mongoose-findoneorcreate');

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

conversationSchema.plugin(findOneOrCreate);

mongoose.model('Conversation', conversationSchema);
