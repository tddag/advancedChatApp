import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NavBar extends Component {
  render() {
    return (
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <Link class="navbar-brand" to="/">
          Chat App
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon" />
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <Link class="nav-link" to="/room_chat">
                Room Chat
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/users">
                Users
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default NavBar
