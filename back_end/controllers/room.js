const Room = require('../models/Room')
const Socket = require('../models/Socket')

const createRoom = (io, data) => {
  if (data.name == '') {
    io.sockets.emit('createFail', {
      message: 'Cannot be blank',
    })
  } else {
    Room.findOne({ name: data.name }).then(room => {
      if (room) {
        io.sockets.emit('createFail', {
          message: 'Room is already existed',
        })
      } else {
        const newRoom = new Room({
          name: data.name,
        })
        newRoom.save()
        io.sockets.emit('createSuccess', {
          message: 'Create successfully',
          newRoom: newRoom,
        })
      }
    })
  }
}

const saveChat = (io, data) => {
  Room.findOne({ name: data.room }).then(room => {
    if (room) {
    }
  })
}

module.exports = { createRoom: createRoom }
