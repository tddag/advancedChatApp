import React, { Component } from 'react'
import './ChatWindow.styles.css'
import { Container, Row, Col, Button } from 'reactstrap'
import { Link } from 'react-router-dom'

class ChatWindow extends Component {
  constructor() {
    super()
    this.state = {
      roomName: '',
      userName: '',
      message: '',
      activeUsers: [],
      events: [],
      messageLog: [],
      error: '',
    }
  }

  componentDidMount() {
    let roomName = this.props.match.params.name
    let userName = this.props.match.params.username
    let activeUsers = this.state.activeUsers
    activeUsers.push({ name: userName })
    this.setState({
      roomName: roomName,
      userName: userName,
      activeUsers: activeUsers,
    })
    let { socket } = this.props
    let { events, messageLog } = this.state

    // Get Chat History
    fetch(`http://localhost:4000/room/get/${roomName}`)
      .then(res => res.json())
      .then(room => {
        let messageLog = []
        room.chatHistories.map(message => {
          messageLog.unshift({
            message: `${message.userName}: ${message.message}`,
            timeStamp: message.timestamp,
          })
        })
        //console.log(messageLog);
        this.setState({
          messageLog: messageLog,
        })
      })

    socket.on('chat', data => {
      console.log('get response')
      console.log(data)
      let messageLog = this.state.messageLog
      messageLog.unshift({
        message: `${data.user}: ${data.message}`,
        timeStamp: data.timeStamp,
      })
      // Check if in activeUsers
      let activeUsers = this.state.activeUsers
      if (!this.isActiveUser(data.user)) {
        activeUsers.push({ name: data.user })
      }
      this.setState({
        messageLog: messageLog,
        activeUsers: activeUsers,
      })
    })

    // Send activeUser to other members in the group
    socket.emit('activeUser', {
      userName: userName,
      roomName: roomName,
    })

    // Listen to leftGroup event, then add to event list
    socket.on('leftGroup', data => {
      let events = this.state.events
      events.unshift({ event: `${data.userName} has left the group` })
      this.setState({
        events: events,
      })
      if (this.isActiveUser) this.removeActiveUser(data.userName)
    })

    // Listen to activeUser event when new user joins the group
    socket.on('activeUser', data => {
      // let activeUsers = this.state.activeUsers
      let events = this.state.events
      activeUsers.push({ name: data.userName })
      events.unshift({ event: `${data.userName} has joined this group` })
      this.setState({
        activeUsers: activeUsers,
        events: events,
      })
    })
  }

  componentWillUnmount() {
    // Announce other members in the group "user left the group"
    let { socket } = this.props
    socket.emit('leftGroup', {
      roomName: this.state.roomName,
      userName: this.state.userName,
    })
  }

  // Check if user is in this.state.activeUsers
  isActiveUser = username => {
    for (let user of this.state.activeUsers) {
      if (user.name === username) return true
    }
    return false
  }

  // Remove user from activeUsers list
  removeActiveUser = username => {
    let activeUsers = this.state.activeUsers
    for (let i = 0; i < activeUsers.length; i++) {
      if (activeUsers[i].name === username) activeUsers.splice(i, 1)
    }
    this.setState({
      activeUsers: activeUsers,
    })
  }

  getActiveUsers = () => {
    return this.state.activeUsers.map((user, index) => {
      return (
        <p key={index}>
          <span className="dot dot-success" /> {user.name}
        </p>
      )
    })
  }

  getEvents = () => {
    return this.state.events.map((event, index) => {
      return (
        <p key={index}>
          {' '}
          <i>{event.event} </i>
        </p>
      )
    })
  }

  // Tam - Username is set by default
  // nameChange = e => {
  //   this.setState({
  //     userName: e.target.value,
  //   })
  // }

  messageChange = e => {
    this.setState({
      message: e.target.value,
    })
  }

  getMessages = () => {
    return this.state.messageLog.map((message, index) => {
      return (
        <div key={index}>
          <span className="mw">{message.message} </span>
          <div className="right-0">
            <i> {message.timeStamp}</i>{' '}
          </div>
        </div>
      )
    })
  }

  handleSend = roomName => {
    let { socket } = this.props
    let d = new Date()
    let date = d.toLocaleDateString()
    let time = d.toLocaleTimeString()
    let timeStamp = date + ' ' + time
    // console.log(timeStamp);
    socket.emit('chat', {
      room: roomName,
      user: this.state.userName,
      message: this.state.message,
      timeStamp: timeStamp,
      date: date,
      time: time,
    })
    // Tam - not gonna check for now
    // socket.emit('checkHandle', {
    //   user: this.state.userName,
    // })

    // socket.on('checkFail', data => {
    //   this.setState({
    //     error: data.message,
    //   })
    // })
  }

  render() {
    return (
      <Container>
        <h1> Room {this.state.roomName}</h1>
        <Link to={`/rooms`}>
          <Button className="leaveBtn" color="secondary">
            Leave Group
          </Button>
        </Link>
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
                placeholder="Handle"
                //onChange={this.nameChange}
                value={`Username: ${this.state.userName}`}
                disabled
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
          <Col xs="3">
            <div className="window">
              <div className="window-head">
                <h2>Room Status</h2>
              </div>
              <div className="list">{this.getEvents()}</div>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default ChatWindow
