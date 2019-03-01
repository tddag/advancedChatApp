import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import socketIOClient from 'socket.io-client'

var socket
class NavBar extends Component {
  constructor() {
    super()
    this.state = {
      endpoint: 'http://localhost:4000',
    }
    socket = socketIOClient(this.state.endpoint)
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          Chat App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link className="nav-link" to="/rooms">
                Room Chat
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/users">
                Users
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export { NavBar, socket }
