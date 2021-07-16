/* eslint-disable consistent-return */
const express = require('express');
const Tweet = require('../db/tweet')
const User = require('../db/user')
const Log = require("../db/log")


const router = express.Router();

// Get All Logs
router.get('/', async (req, res, next) => {
  try {

    const logs = await Log.find()
      .sort({ _id: -1 })

    return res.send(logs)
  } catch (err) {
    return next(err)
  }
});

// Get my logs
router.get('/me', async (req, res, next) => {
  try {
    const userId = req.user && req.user.userId

    const logs = await Log.find({ user: userId })
      .sort({ _id: -1 })
      .populate({ path: "following", ref: User }).populate({ path: "tweet", ref: Tweet })


    res.send(logs)

  }

  catch (err) {
    next(err)
  }

})


module.exports = router;
