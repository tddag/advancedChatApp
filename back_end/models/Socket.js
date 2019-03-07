const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SocketSchema = new Schema({
  eventType: {
    type: String,
  },
  createdAt: {
    type: String,
  },
  createdBy: {
    type: String,
  },
  createIn: {
    type: String,
  },
  desc: {
    type: String,
  },
})

module.exports = Socket = mongoose.model('sockets', SocketSchema)
