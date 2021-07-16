const mongoose = require('mongoose')

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    doer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
    },
  },
  {
    collection: 'notification',
    timestamps: true,
  },
)

const Notification = mongoose.model('Notification', notificationSchema)

module.exports = Notification
