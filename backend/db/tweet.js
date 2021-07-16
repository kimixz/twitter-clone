const mongoose = require('mongoose')
const { TWEET } = require('../constants/messages/messages')

const tweetSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, TWEET.SENDER_REQUIRED],
    },
    message: {
      type: String,
      //  required: [true, TWEET.MESSAGE_REQUIRED]
    },
    mediaType: {
      type: String,
      required: [true, TWEET.MESSAGETYPE_REQUIRED],
      // validate: ["text", "media", "text/media"]
    },
    media: {
      type: String,
    },
    likes: {
      type: Array,
      default: [],
    },
    retweets: {
      type: Array,
      default: [],
    },
    hashtags: {
      type: Array,
      default: [],
    },
    isRetweeted: {
      type: Boolean,
      default: false
    },
    retweetedFrom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tweet',
    }
  },
  {
    collection: 'tweet',
    timestamps: true,
  },
)

const Tweet = mongoose.model('Tweet', tweetSchema)

module.exports = Tweet
