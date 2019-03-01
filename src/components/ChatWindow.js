import React, { Component } from 'react'
import './ChatWindow.styles.css'
import { Container, Row, Col } from 'reactstrap'

class ChatWindow extends Component {
  state = {
    activeUser: ['John', 'Tony'],
    events: ['John joined this room', 'Tony joined this room'],
  }

  getActiveUser = () => {
    return this.state.activeUser.map(user => {
      return (
        <p>
          <span className="dot dot-success" /> {user}
        </p>
      )
    })
  }

  getEvents = () => {
    return this.state.events.map(event => {
      return <p>{event}</p>
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
                <div id="output" />
              </div>
              <input id="handle" type="text" placeholder="Handle" />
              <input id="message" type="text" placeholder="Message" />
              <button id="send">Send</button>
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
