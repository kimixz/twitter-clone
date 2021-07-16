const express = require('express')
const User = require('../db/user')
const Tweet = require('../db/tweet')

const router = express.Router()

// Search
router.post('/', async (req, res, next) => {
  try {
    console.log(req.body)
    if (req.body.search.charAt(0) === '@') {
      // search in users
      const searchUsername = req.body.search.substring(1)
      const user = await User.findOne({ username: searchUsername })
      console.log(searchUsername, user)
      if (user && user.username) {
        return res.send({ status: 'OK', user })
      }
      return res.send({ status: 'NO', message: 'This user is not found' })
    }
    if (req.body.search.charAt(0) === '#') {
      // serach in hashtags
      const searchHashtag = req.body.search.substring(1)
      const hashtag = await Tweet.find({ hashtags: searchHashtag }).populate({
        path: 'sender',
        model: User,
      })
      console.log(hashtag)
      if (hashtag) {
        return res.send({ status: 'OK', hashtag })
      }
      return res.send({ status: 'NO', message: 'This Hashtag is not found' })
    }
    // search in tweets

    const tweets = await Tweet.find({
      message: { $regex: `.*${req.body.search}.*` },
    }).populate({ path: 'sender', model: User })
    console.log(tweets)
    if (tweets) {
      return res.send({ status: 'OK', tweets })
    }
    return res.send({ status: 'NO', message: 'This message is not found' })
  } catch (err) {
    return next(err)
  }
})

module.exports = router
