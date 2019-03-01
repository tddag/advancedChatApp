import React, { Component } from 'react'
import './ChatWindow.styles.css'
import { Container, Row, Col } from 'reactstrap'
import { socket } from './NavBar'

class ChatWindow extends Component {
  state = {
    username: '',
    message: '',
    activeUser: [{ id: 1, name: 'John' }, { id: 2, name: 'Tony' }],
    events: [
      { id: 1, event: 'John joined this room' },
      { id: 2, event: 'Tony joined this room' },
    ],
    messageLog: [],
  }

  componentDidMount() {
    socket.on('chat', data => {
      let messageLog = this.state.messageLog
      messageLog.unshift(`${data.user}: ${data.message}`)
      console.log(messageLog)
      this.setState({
        messageLog: messageLog,
      })
    })
  }

  getActiveUser = () => {
    return this.state.activeUser.map(user => {
      return (
        <p key={user.id}>
          <span className="dot dot-success" /> {user.name}
        </p>
      )
    })
  }

  getEvents = () => {
    return this.state.events.map(event => {
      return <p key={event.id}>{event.event}</p>
    })
  }

  nameChange = e => {
    this.setState({
      username: e.target.value,
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
    socket.emit('chat', {
      user: this.state.username,
      message: this.state.message,
    })
  }

  render() {
    return (
      <Container>
        <h1> Room #</h1>
        <Row>
          <Col xs="3">
            <div className="window">
              <div className="window-head">
                <h2>Active User</h2>
              </div>
              <div className="list">{this.getActiveUser()}</div>
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
