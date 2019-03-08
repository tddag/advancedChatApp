import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Rooms.styles.css'
import {
  Button,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap'

let uri =
  process.env.NODE_ENV === 'production'
    ? 'https://taha-chatapp.herokuapp.com/'
    : 'http://localhost:4000'
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
      username: 'Anonymous',
    }
  }

  componentDidMount() {
    fetch(`${uri}/room/get/all`)
      .then(res => res.json())
      .then(rooms => {
        this.setState({
          rooms: rooms,
        })
      })
    let { socket } = this.props

    // get all the users
    fetch(`${uri}/user/get/all`)
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
    let d = new Date()
    let date = d.toLocaleDateString()
    let time = d.toLocaleTimeString()
    let timeStamp = date + ' ' + time
    console.log(roomName)
    socket.emit('joinRoom', {
      roomName: roomName,
      userName: this.state.username,
      date: date,
      time: time,
      timeStamp: timeStamp,
    })
  }

  renderRooms = () => {
    return this.state.rooms.map((room, index) => {
      return (
        <tr key={index}>
          <th scope="row">{index + 1}</th>
          <td>{room.name}</td>
          <td>
            <Link to={`/chat/${room.name}&${this.state.username}`}>
              <Button color="info" onClick={() => this.handleJoin(room.name)}>
                Join
              </Button>
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
    return this.state.users.map((user, index) => {
      return (
        <DropdownItem key={index} onClick={this.selectUser}>
          {user.name}
        </DropdownItem>
      )
    })
  }

  render() {
    return (
      <div>
        <div className="dropdown-user">
          <ButtonDropdown
            direction="right"
            isOpen={this.state.dropdownOpen}
            toggle={this.toggle}
          >
            <DropdownToggle caret>Choose a User</DropdownToggle>
            <DropdownMenu>{this.renderUsers()}</DropdownMenu>
          </ButtonDropdown>
        </div>
        <div className="ml-100">
          <h2>
            You will be joining a room as <b> {this.state.username}</b>
          </h2>
        </div>

        <table className="table rooms-table-container">
          <thead className="thead-dark">
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
            <Button color="info" onClick={this.createRoom}>
              Create
            </Button>
          </div>
          {this.state.errors && (
            <p className="error-container">
              <small>{this.state.errors}</small>
            </p>
          )}
          {this.state.success && (
            <p className="success-container">
              <small>{this.state.errors}</small>
            </p>
          )}
        </div>
      </div>
    )
  }
}

export default Rooms
