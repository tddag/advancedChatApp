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
    let { socket } = this.props
    let { activeUsers, events, messageLog } = this.state

    socket.on('chat', data => {
      console.log(data)
      messageLog.push(`${data.user}: ${data.message}`)
      this.setState({
        messageLog: messageLog,
      })
    })

    socket.on('checkSuccess', data => {
      socket.emit('chat', {
        user: this.state.userName,
        message: this.state.message,
      })
      let check = activeUsers.filter(user => {
        return user.name == data.user.name
      })
      if (check.length == 0) {
        activeUsers.push(data.user)
        events.push({
          event: `${data.user.name} has joined`,
        })
        this.setState({
          activeUsers: activeUsers,
          events: events,
        })
      }
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
      return <p key={index}>{event.event}</p>
    })
  }

  nameChange = e => {
    this.setState({
      userName: e.target.value,
    })
  }

  messageChange = e => {
    this.setState({
      message: e.target.value,
    })
  }

  getMessages = () => {
    return this.state.messageLog.map(message => {
      return <p> {message}</p>
    })
  }

  handleSend = () => {
    let { socket } = this.props

    socket.emit('checkHandle', {
      user: this.state.userName,
    })

    socket.on('checkFail', data => {
      this.setState({
        error: data.message,
      })
    })
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
                onChange={this.nameChange}
              />
              <input
                id="message"
                type="text"
                placeholder="Message"
                onChange={this.messageChange}
              />
              <button id="send" onClick={this.handleSend}>
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
