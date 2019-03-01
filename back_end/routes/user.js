const express = require('express')
const router = express.Router()

const User = require('../models/User')

router.post('/create', (req, res) => {
  const newUser = new User({ name: req.body.name })
  newUser.save()
})

router.get('/get/all', (req, res) => {
  User.find({}, (err, users) => {
    if (users) {
      res.status(200).json(users)
    }
  })
})

module.exports = router
