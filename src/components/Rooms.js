import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Rooms.styles.css'
class Rooms extends Component {
  state = {
    id: 0,
    roomName: '',
    rooms: [],
  }
  renderRooms = () => {
    return this.state.rooms.map(room => {
      return (
        <tr key={room.id}>
          <th scope="row">{room.id}</th>
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
    let rooms = this.state.rooms
    rooms.push({
      id: this.state.id + 1,
      name: this.state.roomName,
    })
    this.setState({
      id: this.state.id + 1,
      rooms: rooms,
    })
  }
  render() {
    return (
      <div>
        <table className="table table-container">
          <thead className="thead-dark">
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
