const Room = require('../models/Room')

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

module.exports = createRoom
