const express = require('express')
const router = express.Router()

const Room = require('../models/Room')

router.post('/create', (req, res) => {
  const newRoom = new Room({ name: req.body.name })
  newRoom.save()
})

router.get('/get/all', (req, res) => {
  Room.find({}, (err, rooms) => {
    if (rooms) {
      res.status(200).json(rooms)
    }
  })
})

module.exports = router
