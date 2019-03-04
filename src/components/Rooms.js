import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Rooms.styles.css'

class Rooms extends Component {
  constructor(props) {
    super(props)
    this.state = {
      roomName: '',
      rooms: [],
      errors: '',
      success: '',
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
  }

  renderRooms = () => {
    return this.state.rooms.map((room, index) => {
      return (
        <tr key={index}>
          <th scope="row">{index + 1}</th>
          <td>{room.name}</td>
          <td>
            <Link to={`/chat/${room.name}`}>
              <button>Join</button>
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

  render() {
    return (
      <div>
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
        <div className="rooms-container">
          <input
            type="text"
            placeholder="Create room"
            value={this.state.roomName}
            onChange={this.handleChange}
          />
          <button onClick={this.createRoom}>Create</button>
        </div>
      </div>
    )
  }
}

export default Rooms
