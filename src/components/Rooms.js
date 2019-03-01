import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Rooms.styles.css'
class Rooms extends Component {
  state = {
    roomName: '',
    rooms: [],
  }
  renderRooms = () => {
    return this.state.rooms.map((room, index) => {
      return (
        <tr key={index}>
          <th scope="row">{index + 1}</th>
          <td>{room.name}</td>
          <td>
            <Link to="/chat">
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
  handleSubmit = () => {
    fetch('http://localhost:4000/room/create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.roomName,
      }),
    })
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
          <button onClick={this.handleSubmit}>Create</button>
        </div>
      </div>
    )
  }
}

export default Rooms
