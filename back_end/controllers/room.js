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
  io.to(data.room).emit('chat', data)

  Room.updateOne(
    { name: data.room },
    {
      $push: {
        chatHistories: {
          userName: data.user,
          message: data.message,
          timestamp: data.timeStamp,
          date: data.date,
          time: data.time,
        },
      },
    }
  )
    .then(() => {
      Room.findOne({ name: data.room }).then(room => {
        io.sockets.emit('saveSuccess', {
          message: 'Store successfully',
          room: room,
        })
      })
    })
    .catch(() => {
      io.sockets.emit('saveFail', {
        message: 'No room exits',
      })
    })
}

const saveEvent = (eventType, data) => {
  Room.updateOne(
    { name: data.roomName },
    {
      $push: {
        eventHistories: {
          type: eventType,
          username: data.userName,
          date: data.date,
          time: data.time,
          timeStamp: data.timeStamp,
        },
      },
    }
  ).then((err, room) => {})
}

module.exports = {
  createRoom: createRoom,
  saveChat: saveChat,
  saveEvent: saveEvent,
}
