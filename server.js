const express = require('express')
const http = require('http')
const socketIO = require('socket.io')
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require('body-parser')

// Import routes
const history = require('./back_end/routes/api/history')
const room_history = require('./back_end/routes/api/room_history')
const events = require('./back_end/routes/api/events')

const app = express()

// Middleware
app.use(bodyParser.json())

// Create server instance
const server = http.createServer(app)

// Create IO using server instance
const io = socketIO(server)

io.on('connection', socket => {
  console.log('made socket connection', socket.id)

  socket.on('chat', data => {
    console.log('chat')
    io.sockets.emit('chat', data)
  })
})

// Use route
app.use('/api/history', history)
app.use('/api/room_history', room_history)
app.use('/api/events', events)

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
