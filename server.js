const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')

const { registerUser, checkHandle } = require('./back_end/controllers/user')
const { createRoom } = require('./back_end/controllers/room')
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
  let time = new Date()
  saveSocket('CONNECT', time, socket.id, '', 'User connected')
  console.log('user connect', socket.id)

  socket.on('disconnect', () => {
    console.log('user disconnected')
    saveSocket('DISCONNECT', time, socket.id, '', 'User disconneced')
  })

  socket.on('chat', data => {
    console.log('test chat')
    let roomName = data.room
    console.log(data)
    io.to(roomName).emit('chat', data)
    saveSocket('CHAT', time, socket.id, '', `${data.user} sent a message`)
  })

  socket.on('registerUser', data => {
    registerUser(io, data)
  })

  // Tam - not gonna check for now
  // socket.on('checkHandle', data => {
  //   console.log('check handle')
  //   checkHandle(io, data)
  // })

  socket.on('createRoom', data => {
    console.log(data)
    createRoom(io, data)
    saveSocket(
      'CREATE_ROOM',
      time,
      socket.id,
      '',
      `${data.name} room is created`
    )
  })

  socket.on('joinRoom', roomName => {
    console.log('joinTest backend', roomName)
    socket.join(roomName)
    saveSocket('JOIN_ROOM', time, socket.id, '', `${roomName} room is created`)
  })

  // Send activeUser to other members in the group
  socket.on('activeUser', data => {
    saveSocket('SAVE_ACTIVE_USERS', time, socket.id, '', `save active users`)
    socket.to(data.roomName).emit('activeUser', { userName: data.userName })
  })

  // Announce other members in the group "user has left the group"
  socket.on('leftGroup', data => {
    saveSocket('SAVE_LEFT_GROUP', time, socket.id, '', `save left groups`)
    socket.leave(data.roomName)
    socket.to(data.roomName).emit('leftGroup', { userName: data.userName })
  })
})

// app.use((req,res,next) => {
//   req.socketIO = io;
//   next();
// })
// Use route
// app.use('/api/history', history)
// app.use('/api/room_history', room_history)
// app.use('/api/events', events)
app.use('/user', user)
app.use('/room', room)

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))

  // Set default file for all routes
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'index.html'))
  })
}

// Set port
const port = process.env.PORT || 4000

server.listen(port, () => {
  console.log(`Server started on port ${port}`)
})

module.exports = io
