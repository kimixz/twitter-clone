/* eslint-disable consistent-return */
const express = require('express');
const User = require('../db/user')
const Notification = require("../db/notification")


const router = express.Router();

// Get All Notofications
router.get('/', async (req, res, next) => {
  try {

    const notifications = await Notification.find()
      .sort({ _id: -1 })
      .populate({ path: "user", ref: User }).populate({ path: "doer", ref: User })

    return res.send(notifications)
  } catch (err) {
    return next(err)
  }
});

// Get my notifictaions
router.get('/me', async (req, res, next) => {
  try {
    const userId = req.user && req.user.userId

    const notifications = await Notification.find({ user: userId })
      .sort({ _id: -1 })
      .populate({ path: "user", ref: User }).populate({ path: "doer", ref: User })


    res.send(notifications)

  }

  catch (err) {
    next(err)
  }

})


module.exports = router;
