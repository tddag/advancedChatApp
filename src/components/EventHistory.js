import React, { Component } from 'react'
import { Container, Table } from 'reactstrap'
import { Link } from 'react-router-dom'
import './EventHistory.styles.css'

class EventHistory extends Component {
  constructor() {
    super()
    this.state = {
      rooms: [],
    }
  }

  componentDidMount() {
    // Get all rooms
    fetch('http://localhost:4000/room/get/all')
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
          <td> {event.date} </td> <th> {event.date} </th>
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
          <Table hover>
            <thead>
              <tr>
                <th> # </th>
                <th> User </th>
                <th> Type </th>
                <th> Date </th>
                <th> Time </th>
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
