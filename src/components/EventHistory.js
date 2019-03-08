import React, { Component } from 'react'
import { Container, Table } from 'reactstrap'
import './EventHistory.styles.css'

let uri =
  process.env.NODE_ENV === 'production'
    ? 'https://taha-chatapp.herokuapp.com/'
    : 'http://localhost:4000'
class EventHistory extends Component {
  constructor() {
    super()
    this.state = {
      rooms: [],
    }
  }

  componentDidMount() {
    // Get all rooms
    fetch(`${uri}/room/get/all`)
      .then(res => res.json())
      .then(rooms => {
        this.setState({
          rooms: rooms,
        })
      })
  }

  renderRoomEvents = room => {
    return room.eventHistories.map((event, index) => {
      return (
        <tr key={index}>
          <th> {index + 1} </th>
          <td> {event.username} </td>
          <td> {event.type} </td>
          <td> {event.date} </td>
          <td> {event.time} </td>
        </tr>
      )
    })
  }

  renderEvents = () => {
    return this.state.rooms.map((room, index) => {
      return (
        <div key={index}>
          <h2> Room: {room.name}</h2>
          <Table striped>
            <thead>
              <tr>
                <th> # </th>
                <th> User </th>
                <th> Type </th>
                <th> Date </th>
                <th> Time </th>
              </tr>
            </thead>
            <tbody>{this.renderRoomEvents(room)}</tbody>
          </Table>
        </div>
      )
    })
  }

  render() {
    return (
      <Container>
        <h1> Event History</h1>
        <div>{this.renderEvents()}</div>
      </Container>
    )
  }
}

export default EventHistory
