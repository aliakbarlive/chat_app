const mongoose = require('mongoose')
const { Schema, model } = mongoose

const messageSchema = new Schema(
  {
    message: {
      type: String,
      required: true
    },
    users: {
      type: Array,
      required: true
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    readers: {
      type: Array,
      default: []
    }
  },
  {
    timestamps: true
  }
)

module.exports = model('Message', messageSchema)