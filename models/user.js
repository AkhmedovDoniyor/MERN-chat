const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }, 
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
  following: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
  pic: {
    type: String,
    default: "https://res.cloudinary.com/dkjkqolhn/image/upload/v1661845188/avatar_qru48h.png"
  },
  
});

model('User', userSchema);
