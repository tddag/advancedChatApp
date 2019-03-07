const mongoose = require('mongoose')
const Schema = mongoose.Schema

const RoomSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  chatHistories: {
    type: Array,
  },
  eventHistories: {
    type: Array,
  },
})

module.exports = Room = mongoose.model('rooms', RoomSchema)
