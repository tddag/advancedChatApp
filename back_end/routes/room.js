const express = require('express')
const router = express.Router()

const Room = require('../models/Room')

router.get('/get/all', (req, res) => {
  Room.find({}, (err, rooms) => {
    if (rooms) {
      res.status(200).json(rooms)
    }
  })
})

router.get('/get/:room', (req, res) => {
  const room = req.params.room.replace('%20', ' ')
  Room.findOne({ name: room }, (err, room) => {
    if (room) {
      res.status(200).json(room)
    }
  })
})

module.exports = router
