const mongoose = require('mongoose')
const { emailRegex } = require('../constants/constants')
const { USER, GENERAL } = require('../constants/messages/messages')

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      minlength: [3, USER.USERNAME_TOO_SHORT],
      maxlength: [36, USER.USERNAME_TOO_LONG],
      unique: [true, USER.USERNAME_UNIQUE],
    },
    email: {
      type: String,
      unique: [true, GENERAL.EMAIL_UNIQUE],
      required: [true, GENERAL.EMAIL_REQUIRED],
      validate: [emailRegex, GENERAL.EMAIL_INCORRECT],
    },
    password: { type: String, required: [true, USER.PASSWORD_REQUIRED] },
    profilePicture: {
      type: String,
    },
    tweets: {
      type: Array,
    },
    followers: {
      type: Array,
    },
    followings: {
      type: Array,
    },
  },
  {
    collection: 'user',
    timestamps: true,
  },
)

const User = mongoose.model('User', userSchema)

module.exports = User
