import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import './Landing.styles.css'
import jwt_decode from 'jwt-decode'

class Landing extends Component {
  constructor() {
    super() 
    this.state = {
      userName: 'Anonymous',
      roomName: 'General',
      message: '',
      activeUsers: [],
      events: [],
      messageLog: [],
      loggedIn: false
    }
  }

  componentDidMount() {
    let { socket } = this.props
    let token = localStorage.getItem('jwtToken')
    if(token){
      this.setState({
        loggedIn: true, 
        userName: jwt_decode(token).name
      })
    }


    let d = new Date()
    let date = d.toLocaleDateString()
    let time = d.toLocaleTimeString()
    let timeStamp = date + ' ' + time
    socket.emit('joinRoom', {
      roomName: this.state.roomName, 
      userName: this.state.userName,
      date: date,
      time: time,
      timeStamp: timeStamp,
    })
    // Get Chat History
    fetch(`/room/get/${this.state.roomName}`)
      .then(res => res.json())
      .then(room => {
        // Get Message History
        let messageLog = []
        room.chatHistories.map(message => {
          messageLog.push({
            message: `${message.userName}: ${message.message}`,
            timeStamp: message.timestamp,
          })
        })
      this.setState({
        messageLog: messageLog,
      })
    })

    socket.on('allActiveUsers', data => {
      let currentActiveUsers = data
      this.setState({
        activeUsers: currentActiveUsers
      })
    })
    
    // Listen to chat event
    socket.on('chat', data => {
      let messageLog = this.state.messageLog
      messageLog.push({
        message: `${data.user}: ${data.message}`,
        timeStamp: data.timeStamp,
      })
      this.setState({
        messageLog: messageLog,
      })
    })

    let activeUsers = this.state.activeUsers
      activeUsers.push({name: token ? jwt_decode(token).name : this.state.userName})
      this.setState({
        activeUsers: activeUsers
    })

    // Send activeUser to other members in the group
    socket.emit('activeUser', {
      userName: token? jwt_decode(token).name : this.state.userName,
      roomName: this.state.roomName,
    })

    // Listen to activeUser event 
    socket.on('activeUser', data => {
      let activeUsers = this.state.activeUsers
      activeUsers.push({name: data.userName})
      this.setState({
        activeUsers: activeUsers
      })
      socket.emit('allActiveUsers', {
        roomName: this.state.roomName,
        allUsers: this.state.activeUsers
      })
    }) 

    // Listen to leftGroup event, then add to event list
    socket.on('leftGroup', data => {
      let activeUsers = this.state.activeUsers
      for (let i = 0; i < activeUsers.length; i++) {
        if (activeUsers[i].name === data.userName) {
          activeUsers.splice(i, 1)
        }
      }
      socket.emit('allActiveUsers', {
        roomName: this.state.roomName,
        allUsers: activeUsers
      })
    })
  }

  getActiveUsers = () => {
    return this.state.activeUsers.map((user, index) => {
      return (
        <p key = {index}>
          <span className="dot dot-success"/> {user.name}
        </p>
      )
    })
  }

  messageChange = e => {
    this.setState({
      message: e.target.value
    })
  }

  getMessages = () => {
    return this.state.messageLog.map((message, index) => {
      return (
        <div key={index}> 
          <span className="mv"> {message.message}</span>
          <div className="right-0">
            <i> {message.timeStamp} </i> {' '}
          </div>
        </div>
      )
    })
  }
  componentWillUnmount() {
    let {socket} = this.props
    let activeUser = this.state.activeUsers
    for (let i=0; i< activeUser.length; i++) {
      if (activeUser[i].name === this.state.userName) {
        activeUser.splice(i, 1)
        break
      }
    }
    socket.emit('allActiveUsers', {
      roomName: this.state.roomName,
      allUsers: this.state.activeUsers
    })
  }
  
  handleSend = roomName => {
    let { socket } = this.props
    let d = new Date()
    let date = d.toLocaleDateString()
    let time = d.toLocaleTimeString()
    let timeStamp = date + ' ' + time
    socket.emit('chat', {
      room: roomName,
      user: this.state.userName,
      message: this.state.message,
      timeStamp: timeStamp,
      date: date,
      time: time,
    })
  }

  handleUsernameChange = e => {
    let { socket } = this.props
    this.setState({
      userName: e.target.value
    })
    let newActiveUsers = this.state.activeUsers
     for (let i = 0; i< newActiveUsers.length; i++) {
      if(newActiveUsers[i].name === this.state.userName) {
        newActiveUsers[i].name = e.target.value
        break
      }
    }
    socket.emit('nameChange', {
      newName: e.target.value
    })
    socket.emit('allActiveUsers', {
      roomName: this.state.roomName,
      allUsers: newActiveUsers
    })
  }

  render() {
    return (
      <div>
        <div className="landing">
          <div className="dark-overlay landing-inner">
            <div className="container">
              <div className="row">
                <div className="col-md-12 text-center">
                  <h1 className="display-3 mb-4">Chat App</h1>
                  <p className="lead">
                    Welcome to a Chat App using React and Socket.IO. 
                  </p>
                  <p>
                   Login to be able to create, join a room or see chat history, event history!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Container>
        <h1> General Room</h1>
        <Row>
          <Col xs="3">
            <div className="window">
              <div className="window-head">
                <h2>Active User</h2>
              </div>
              <div className="list">{this.getActiveUsers()}</div>
            </div>
          </Col>
          <Col>
            <div id="mario-chat">
              <h2>Chat</h2>
              <div id="chat-window">
                <div id="output">{this.getMessages()}</div>
              </div>
              <input
                id="handle"
                type="text"
                placeholder="<Type your name here> (default: Anonymous)"
                onChange={this.handleUsernameChange}
              />
              <input
                id="message"
                type="text"
                placeholder="Message"
                onChange={this.messageChange}
              />
              <button
                id="send"
                onClick={() => this.handleSend(this.state.roomName)}
              >
                Send
              </button>
            </div>
          </Col>
         </Row>
        </Container>
      </div>
      
    )
  }
}

export default Landing
