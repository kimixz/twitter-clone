/* eslint-disable consistent-return */
const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../db/user')
const Tweet = require('../db/tweet')
const Notification = require('../db/notification')
const Log = require('../db/log')

const router = express.Router()

// Get All Users
router.get('/', async (req, res, next) => {
  try {
    const user = await User.find().sort({ _id: -1 }).select({
      _id: 1,
      username: 1,
      email: 1,
      followers: 1,
      followings: 1,
      tweets: 1,
    })

    return res.send(user)
  } catch (err) {
    return next(err)
  }
})

// Get feed
router.get('/feed', async (req, res, next) => {
  try {
    const userId = req.user && req.user.userId

    const user = await User.findById(userId).select({ followings: 1 })
    const tweets = await Tweet.find({
      $or: [
        {
          sender: { $in: user.followings },
        },
        {
          sender: userId,
        },
      ],
    })
      .select({
        message: 1,
        media: 1,
        mediaType: 1,
        likes: 1,
        retweets: 1,
        hashtags: 1,
        sender: 1,
        isRetweeted: 1,
        retweetedFrom: 1,
      })
      .populate({
        path: 'sender',
        model: User,
      })
      .sort({ _id: -1 })
    const newTweets = []
    tweets.forEach(tweetItem => {
      if (tweetItem.likes.includes(userId)) {
        const newTweetItem = { ...tweetItem._doc, isLiked: true }
        newTweets.push(newTweetItem)
      } else {
        const newTweetItem = { ...tweetItem._doc, isLiked: false }
        newTweets.push(newTweetItem)
      }
    })

    res.send(newTweets)
  } catch (err) {
    next(err)
  }
})

// Edit Profile
router.post('/editprofile', async (req, res, next) => {
  try {
    const userId = req.user && req.user.userId

    const user = await User.findById(userId)

    const newData = {
      username: req.body.username,
      profilePicture: req.body.profilePicture,
    }
    Object.assign(user, newData)

    await user.save()
    return res.send('Edited Successfully')
  } catch (err) {
    next(err)
  }
})

// Get User Info
router.get('/me', async (req, res, next) => {
  try {
    const userId = req.user && req.user.userId

    const tweets = await Tweet.find({
      sender: userId,
    })
      .select({
        message: 1,
        media: 1,
        mediaType: 1,
        likes: 1,
        retweets: 1,
        hashtags: 1,
        isRetweeted: 1,
        retweetedFrom: 1,
        sender: 1,
      })
      .sort({ _id: -1 })
      .populate({
        path: 'sender',
        model: User,
      })

    const newTweets = []
    tweets.forEach(tweetItem => {
      if (tweetItem.likes.includes(userId)) {
        const newTweetItem = { ...tweetItem._doc, isLiked: true }
        newTweets.push(newTweetItem)
      } else {
        const newTweetItem = { ...tweetItem._doc, isLiked: false }
        newTweets.push(newTweetItem)
      }
    })

    const user = await User.findById(userId, {
      username: 1,
      profilePicture: 1,
      followers: 1,
      followings: 1,
    })
    user.tweets = newTweets

    res.send(user)
  } catch (err) {
    next(err)
  }
})

// Login a user
router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
      email: req.body.email.toLowerCase(),
    })
    if (user) {
      const isPasswordCorrect = await bcrypt.compare(
        req.body.password,
        user.password,
      )

      if (isPasswordCorrect) {
        const token = jwt.sign(
          {
            userId: user._id,
          },
          process.env.AUTH_SECRET,
        )
        res.send({
          token,
        })
      } else {
        res.status(400).send({ message: 'Email or password is wrong' })
      }
    } else {
      res.status(400).send({ message: 'Email or password is wrong' })
    }
  } catch (err) {
    next(err)
  }
})

router.get('/search/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)

    const tweets = await Tweet.find({
      sender: req.params.id,
    })
      .select({
        message: 1,
        media: 1,
        mediaType: 1,
        likes: 1,
        retweets: 1,
        hashtags: 1,
        isRetweeted: 1,
        retweetedFrom: 1,
        sender: 1,
      })
      .sort({ _id: -1 })
      .populate({
        path: 'sender',
        model: User,
      })

    user.tweets = tweets

    res.send(user)
  } catch (err) {
    return next(err)
  }
})

// Get a user
router.get('/:id', async (req, res, next) => {
  try {
    const userId = req.user && req.user.userId

    const user = await User.findById(req.params.id)

    const tweets = await Tweet.find({
      sender: req.params.id,
    })
      .select({
        message: 1,
        media: 1,
        mediaType: 1,
        likes: 1,
        retweets: 1,
        hashtags: 1,
        isRetweeted: 1,
        retweetedFrom: 1,
        sender: 1,
      })
      .sort({ _id: -1 })
      .populate({
        path: 'sender',
        model: User,
      })

    const newTweets = []
    tweets.forEach(tweetItem => {
      if (tweetItem.likes.includes(userId)) {
        const newTweetItem = { ...tweetItem._doc, isLiked: true }
        newTweets.push(newTweetItem)
      } else {
        const newTweetItem = { ...tweetItem._doc, isLiked: false }
        newTweets.push(newTweetItem)
      }
    })
    user.tweets = newTweets

    if (user.followers.includes(`${userId}`)) {
      return res.send({ ...user._doc, isFollowed: true })
    }

    return res.send({ ...user._doc, isFollowed: false })
  } catch (err) {
    return next(err)
  }
})

// Post a user
router.post('/signup', async (req, res, next) => {
  try {
    const saltRounds = parseInt(process.env.SALT_ROUNDS, 10)
    const salt = await bcrypt.genSalt(saltRounds)
    const hash = await bcrypt.hash(req.body.password, salt)
    if (req.body.username) {
      const checkUsername = await User.findOne({ username: req.body.username })
      if (!checkUsername) {
        const newUser = new User({
          username: req.body.username,
          email: req.body.email.toLowerCase(),
          password: hash,
        })
        await newUser.save()
        return res.send('OK')
      }

      return res.status(400).send({ message: 'Username is repetitive' })
    }

    const checkEmail = await User.findOne({ email: req.body.email })
    console.log(checkEmail)
    if (!checkEmail) {
      const newUser = new User({
        username: req.body.email.toLowerCase(),
        email: req.body.email.toLowerCase(),
        password: hash,
      })
      await newUser.save()
      return res.send('OK')
    }

    return res.status(400).send({ message: 'Email is repetitive' })
  } catch (err) {
    next(err)
  }
})

// Follow a User
router.get('/follow/:id', async (req, res, next) => {
  try {
    // save in followings
    const userId = req.user && req.user.userId

    const user = await User.findById(userId)
    const newUserData = {
      ...user,
      followings: [...user.followings, req.params.id],
    }

    Object.assign(user, newUserData)
    await user.save()

    // save in followers
    const userToFollow = await User.findById(req.params.id)
    const newUserDataToFollow = {
      ...userToFollow,
      followers: [...userToFollow.followers, userId],
    }
    Object.assign(userToFollow, newUserDataToFollow)
    await userToFollow.save()

    const newNotification = new Notification({
      user: req.params.id,
      doer: userId,
      type: 'follow',
    })
    await newNotification.save()

    const newLog = new Log({
      user: userId,
      type: 'follow',
      following: req.params.id,
    })
    await newLog.save()

    res.send('Followed Successfully')
  } catch (err) {
    next(err)
  }
})

// UnFollow a User
router.get('/unfollow/:id', async (req, res, next) => {
  try {
    // delete from followings
    const userId = req.user && req.user.userId

    const user = await User.findById(userId)
    const newUserData = {
      ...user,
      followings: user.followings.filter(id => id !== req.params.id),
    }

    Object.assign(user, newUserData)
    await user.save()

    // save in followers
    const userToFollow = await User.findById(req.params.id)
    const newUserDataToFollow = {
      ...userToFollow,
      followers: userToFollow.followers.filter(id => id !== userId),
    }
    Object.assign(userToFollow, newUserDataToFollow)
    await userToFollow.save()
    res.send('Followed Successfully')
  } catch (err) {
    next(err)
  }
})

module.exports = router
