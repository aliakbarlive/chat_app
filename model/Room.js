const mongoose = require('mongoose')
const { Schema, model } = mongoose

const roomSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 20,
      unique: true
    },
    users: {
      type: Array,
      required: true
    },
    avatarImage: {
      type: String,
      default: ''
    },
    chatType: {
      type: String,
      default: 'room'
    }
  },
  {
    timestamps: true
  }
)

module.exports = model('Room', roomSchema)