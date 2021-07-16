const mongoose = require('mongoose')


const logSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
    },
    following: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    tweet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tweet'
    }

  },
  {
    collection: 'log',
    timestamps: true,
  },
)

const Log = mongoose.model('Log', logSchema)

module.exports = Log
