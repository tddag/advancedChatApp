import React, { Component } from 'react'

class Rooms extends Component {
  state = {
    id: 1,
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
            <button>Join</button>
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
      id: this.state.id++,
      name: this.state.roomName,
    })
    this.setState({
      rooms: rooms,
    })
  }
  render() {
    return (
      <div>
        <table
          class="table"
          style={{
            marginLeft: '30px',
            textAlign: 'center',
            width: '30%',
            display: 'inline-table',
          }}
        >
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Rooms</th>
              <th />
            </tr>
          </thead>
          <tbody>{this.renderRooms()}</tbody>
        </table>
        <div style={{ float: 'right', paddingRight: '30%' }}>
          <input
            type="text"
            placeholder="Create room"
            value={this.state.roomName}
            onChange={this.handleChange}
          />
          <button onClick={this.handleSubmit}>Create Room</button>
        </div>
      </div>
    )
  }
}

export default Rooms
