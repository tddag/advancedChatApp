import React, { Component } from 'react'
import './ChatWindow.styles.css'
import { Container, Row, Col } from 'reactstrap'

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

    socket.on('chat', data => {
      console.log('get response')
      console.log(data)
      let messageLog = this.state.messageLog
      messageLog.push(`${data.user}: ${data.message}`)
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

    socket.on('activeUser', data => {
      let activeUser = this.state.activeUsers
      let events = this.state.events
      activeUsers.push({ name: data.name })
      events.unshift({ event: `${data.name} has joined this group` })
      this.setState({
        roomName: roomName,
        userName: userName,
        activeUsers: activeUsers,
        events: events,
      })
    })

    // Tam - not gonna check for now
    //   socket.on('checkSuccess', data => {
    //     socket.emit('chat', {
    //       user: this.state.userName,
    //       message: this.state.message,
    //     })
    //     let check = activeUsers.filter(user => {
    //       return user.name == data.user.name
    //     })
    //     if (check.length == 0) {
    //       activeUsers.push(data.user)
    //       events.push({
    //         event: `${data.user.name} has joined`,
    //       })
    //       this.setState({
    //         activeUsers: activeUsers,
    //         events: events,
    //       })
    //     }
    //   })
  }

  // Check if user is in this.state.activeUsers
  isActiveUser = username => {
    for (let user of this.state.activeUsers) {
      if (user.name === username) return true
    }
    return false
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
      return <p key={index}> {message}</p>
    })
  }

  handleSend = roomName => {
    let { socket } = this.props
    socket.emit('chat', {
      room: roomName,
      user: this.state.userName,
      message: this.state.message,
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
