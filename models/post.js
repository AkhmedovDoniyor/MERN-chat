const { Schema, model } = require('mongoose');

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
  comments: [
    {
      text: String,
      postedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    }
  ],
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
});

module.exports = model('Post', postSchema);