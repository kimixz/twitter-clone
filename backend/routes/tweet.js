const express = require('express')
const Tweet = require('../db/tweet')
const User = require('../db/user')
const Log = require('../db/log')
const Notification = require('../db/notification')

const router = express.Router()

// Get All Tweets
router.get('/', async (req, res, next) => {
  try {
    const tweet = await Tweet.find().sort({ _id: -1 }).select({
      _id: 1,
      sender: 1,
      message: 1,
      mediaType: 1,
      media: 1,
      hashtags: 1,
    })

    return res.send(tweet)
  } catch (err) {
    return next(err)
  }
})

// Get All Likes of Tweet
router.get('/likes/:id', async (req, res, next) => {
  try {
    const likes = await Tweet.findOne({
      _id: req.params.id,
    })
      .select({ likes: 1 })
      .populate({
        path: 'likes',
        model: User,
      })

    return res.send(likes)
  } catch (err) {
    return next(err)
  }
})

// Like a tweet
router.get('/like/:id', async (req, res, next) => {
  try {
    const userId = req.user && req.user.userId

    const tweet = await Tweet.findOne({
      _id: req.params.id,
    })

    const newTweetData = {
      ...tweet,
      likes: [...tweet.likes, userId],
    }
    Object.assign(tweet, newTweetData)
    await tweet.save()

    const newNotification = new Notification({
      user: tweet.sender,
      doer: userId,
      type: 'like',
    })
    await newNotification.save()

    const newLog = new Log({
      user: userId,
      type: 'like',
      tweet: tweet._id,
    })
    await newLog.save()

    return res.send('Liked')
  } catch (err) {
    return next(err)
  }
})

// Unlike a tweet
router.get('/unlike/:id', async (req, res, next) => {
  try {
    const userId = req.user && req.user.userId

    const tweet = await Tweet.findOne({
      _id: req.params.id,
    })

    const newTweetData = {
      ...tweet,
      likes: tweet.likes.filter(id => id !== userId),
    }

    Object.assign(tweet, newTweetData)
    await tweet.save()

    return res.send('Liked')
  } catch (err) {
    return next(err)
  }
})

// retweet a tweet
router.get('/retweet/:id', async (req, res, next) => {
  try {
    const userId = req.user && req.user.userId

    const tweet = await Tweet.findOne({
      _id: req.params.id,
    })
    const newTweet = new Tweet({
      sender: userId,
      message: tweet.message,
      media: tweet.media,
      mediaType: tweet.mediaType,
      hashtags: tweet.hashtags,
      isRetweeted: true,
      retweetedFrom: tweet._id,
    })
    await newTweet.save()

    const newNotification = new Notification({
      user: newTweet.sender,
      doer: userId,
      type: 'retweet',
    })

    await newNotification.save()

    const newLog = new Log({
      user: userId,
      type: 'retweet',
      tweet: tweet._id,
    })
    await newLog.save()

    return res.send('Ok')
  } catch (err) {
    return next(err)
  }
})

// Get a tweet
router.get('/:id', async (req, res, next) => {
  try {
    const tweet = await Tweet.findById(req.params.id)
    return res.send(tweet)
  } catch (err) {
    return next(err)
  }
})

// Post a Tweet
router.post('/', async (req, res, next) => {
  try {
    const userId = req.user && req.user.userId

    if (userId) {
      const newTweet = new Tweet({
        sender: userId,
        message: req.body.message,
        media: req.body.media,
        mediaType: req.body.mediaType,
        hashtags: req.body.hashtags,
      })

      await newTweet.save()
      res.send('OK')
    }
  } catch (err) {
    next(err)
  }
})

// Delete a tweet
router.delete('/:id', async (req, res, next) => {
  try {
    await Tweet.deleteMany({
      $or: [
        {
          _id: req.params.id,
        },
        {
          retweetedFrom: req.params.id,
        },
      ],
    })
    return res.send('OK')
  } catch (err) {
    return next(err)
  }
})

module.exports = router
