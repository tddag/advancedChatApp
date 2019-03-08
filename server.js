const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')

const { registerUser } = require('./back_end/controllers/user')
const {
  createRoom,
  saveChat,
  saveEvent,
} = require('./back_end/controllers/room')
const { saveSocket } = require('./back_end/controllers/socket')

// DB config
const db = require('./back_end/config/keys').mongoURI

// Connect to Database
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log('DB is connected'))
  .catch(err => console.log(err))

// Import routes
const history = require('./back_end/routes/api/history')
const room_history = require('./back_end/routes/api/room_history')
const events = require('./back_end/routes/api/events')
const user = require('./back_end/routes/user')
const room = require('./back_end/routes/room')

const app = express()

app.use(cors())

// / parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Middleware
app.use(bodyParser.json())

// Create server instance
const server = http.createServer(app)

// Create IO using server instance
const io = socketIO(server)

io.on('connection', socket => {
  let currentRoomName = ''
  let currentUserName = ''
  let time = new Date()
  saveSocket('CONNECT', time, socket.id, '', 'User connected')

  socket.on('disconnect', () => {
    saveSocket('DISCONNECT', time, socket.id, '', 'User disconneced')
    if (currentRoomName !== '') {
      let d = new Date()
      let date = d.toLocaleDateString()
      let time = d.toLocaleTimeString()
      let timeStamp = date + ' ' + time
      io.to(currentRoomName).emit('leftGroup', {
        userName: currentUserName,
        timeStamp: timeStamp,
      })
      saveEvent('LEAVE_ROOM', {
        userName: currentUserName,
        roomName: currentRoomName,
        date: date,
        time: time,
        timeStamp: timeStamp,
      })
    }
  })

  socket.on('chat', data => {
    saveSocket('CHAT', time, socket.id, '', `${data.user} sent a message`)
    saveChat(io, data)
  })

  socket.on('registerUser', data => {
    registerUser(io, data)
  })

  socket.on('createRoom', data => {
    createRoom(io, data)
    saveSocket(
      'CREATE_ROOM',
      time,
      socket.id,
      '',
      `${data.name} room is created`
    )
  })

  socket.on('joinRoom', data => {
    socket.join(data.roomName)
    currentRoomName = data.roomName
    saveSocket(
      'JOIN_ROOM',
      time,
      socket.id,
      '',
      `${data.roomName} room is created`
    )
    saveEvent('JOIN_ROOM', data)
  })

  // Send activeUser to other members in the group
  socket.on('activeUser', data => {
    currentUserName = data.userName
    saveSocket('SAVE_ACTIVE_USERS', time, socket.id, '', `save active users`)
    io.in(data.roomName).emit('activeUser', data)
  })

  // Announce other members in the group "user has left the group"
  socket.on('leftGroup', data => {
    currentRoomName = ''
    currentUserName = ''
    saveSocket('SAVE_LEFT_GROUP', time, socket.id, '', `save left groups`)
    let d = new Date()
    let date = d.toLocaleDateString()
    let time1 = d.toLocaleTimeString()
    let timeStamp = date + ' ' + time1
    socket.to(data.roomName).emit('leftGroup', data)
    saveEvent('LEAVE_ROOM', data)
    socket.leave(data.roomName)
  })
})

// Use route
// app.use('/api/history', history)
// app.use('/api/room_history', room_history)
// app.use('/api/events', events)
app.use('/user', user)
app.use('/room', room)

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('/build'))

  // Set default file for all routes
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
  })
}

// Set port
const port = process.env.PORT || 4000

server.listen(port, () => {
  console.log(`Server started on port ${port}`)
})

module.exports = io
