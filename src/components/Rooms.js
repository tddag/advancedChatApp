import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Rooms.styles.css'
import {
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'

class Rooms extends Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = {
      roomName: '',
      rooms: [],
      errors: '',
      success: '',
      dropDownOpen: false,
      users: [],
      username: '',
    }
  }

  componentDidMount() {
    fetch('http://localhost:4000/room/get/all')
      .then(res => res.json())
      .then(rooms => {
        this.setState({
          rooms: rooms,
        })
      })
    let { socket } = this.props

    // get all the users
    fetch('http://localhost:4000/user/get/all')
      .then(res => res.json())
      .then(users => {
        this.setState({
          users: users,
        })
      })

    socket.on('createSuccess', data => {
      let { rooms } = this.state
      rooms.push(data.newRoom)
      this.setState({
        rooms: rooms,
        success: data.message,
        errors: '',
      })
    })
  }

  handleJoin = roomName => {
    let { socket } = this.props
    console.log(roomName)
    socket.emit('joinRoom', roomName)
  }

  renderRooms = () => {
    return this.state.rooms.map((room, index) => {
      return (
        <tr key={index}>
          <th scope="row">{index + 1}</th>
          <td>{room.name}</td>
          <td>
            <Link to={`/chat/${room.name}&${this.state.username}`}>
              <button onClick={() => this.handleJoin(room.name)}>Join</button>
            </Link>
          </td>
        </tr>
      )
    })
  }

  handleChange = e => {
    this.setState({
      roomName: e.target.value,
    })
  }

  createRoom = () => {
    let { socket } = this.props
    let { roomName } = this.state

    socket.emit('createRoom', {
      name: roomName,
    })

    socket.on('createFail', data => {
      this.setState({
        errors: data.message,
        success: '',
      })
    })
  }

  toggle() {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
    })
  }

  selectUser = e => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen,
      username: e.target.innerText,
    })
  }

  renderUsers = () => {
    return this.state.users.map(user => {
      return <DropdownItem onClick={this.selectUser}>{user.name}</DropdownItem>
    })
  }

  render() {
    return (
      <div>
        <div class="dropdown-user">
          <ButtonDropdown
            direction="right"
            isOpen={this.state.dropdownOpen}
            toggle={this.toggle}
          >
            <DropdownToggle caret>Choose a User</DropdownToggle>
            <DropdownMenu>{this.renderUsers()}</DropdownMenu>
          </ButtonDropdown>
        </div>

        <table class="table rooms-table-container">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Rooms</th>
              <th />
            </tr>
          </thead>
          <tbody>{this.renderRooms()}</tbody>
        </table>
        <div className="container1">
          <div className="rooms-container">
            <input
              type="text"
              placeholder="Create room"
              value={this.state.roomName}
              onChange={this.handleChange}
            />
            <button onClick={this.createRoom}>Create</button>
          </div>
          {this.state.errors && (
            <p class="error-container">
              <small>{this.state.errors}</small>
            </p>
          )}
          {this.state.success && (
            <p class="success-container">
              <small>{this.state.errors}</small>
            </p>
          )}
        </div>
      </div>
    )
  }
}

export default Rooms
