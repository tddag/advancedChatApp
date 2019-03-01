import React, { Component } from 'react'
import './ChatWindow.styles.css'

class ChatWindow extends Component {
  render() {
    return (
      <div id="mario-chat">
        <h2>Chat</h2>
        <div id="chat-window">
          <div id="output" />
        </div>
        <input id="handle" type="text" placeholder="Handle" />
        <input id="message" type="text" placeholder="Message" />
        <button id="send">Send</button>
      </div>
    )
  }
}

export default ChatWindow
