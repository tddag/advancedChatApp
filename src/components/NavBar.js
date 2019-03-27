import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

class NavBar extends Component {
  constructor(props){
    super(props)
    this.state={
      userName: '',
      loggedIn: false
    }
  }
  handleLogOut = () => {
    localStorage.removeItem('jwtToken')
    this.setState({
      loggedIn: false,
      userName: ''
    })
  }
  componentDidMount(){
    let token = localStorage.getItem('jwtToken')
    if(token){
      this.setState({
        loggedIn: true,
        userName: jwt_decode(token).name
      })
    }
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
          <ul className="navbar-nav mr-auto">
            <li className="nav-item ">
              <Link className="nav-link" to="/rooms">
                Room Chat
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/users">
                Users
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/eventHistory">
                Event History
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/chatHistory">
                Chat History
              </Link>
            </li>
          </ul>
          <ul class="navbar-nav">
            {
              this.state.loggedIn ?
                (
                  <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="http://example.com" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Welcome <b>{this.state.userName}!</b>
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <a class="dropdown-item" href="#" onClick={this.handleLogOut}>Logout</a>
                    </div>
                  </li>
                ) : (
                  <div style={{display: 'inherit'}}>
                    <li className="nav-item mr-auto">
                      <Link className="nav-link" to="/login">
                        Login
                      </Link>
                    </li>
                    <li className="nav-item mr-auto">
                      <Link className="nav-link" to="/register">
                        Register
                      </Link>
                    </li>
                  </div>
                )
            }
          </ul>
        </div>
      </nav>
    )
  }
}

export default NavBar
