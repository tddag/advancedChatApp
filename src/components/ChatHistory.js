import React, { Component } from 'react'
import { Container, Table } from 'reactstrap'
import './EventHistory.styles.css'

let uri =
  process.env.NODE_ENV === 'production'
    ? 'https://taha-chatapp.herokuapp.com/'
    : 'http://localhost:4000'
class ChatHistory extends Component {
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

  renderRoomChat = room => {
    return room.chatHistories.map((message, index) => {
      return (
        <tr key={index}>
          <th> {index + 1} </th>
          <td> {message.userName} </td>
          <td> {message.message} </td>
          <td> {message.date} </td>
          <td> {message.time} </td>
        </tr>
      )
    })
  }

  renderChats = () => {
    return this.state.rooms.map((room, index) => {
      return (
        <div key={index}>
          <h2> Room: {room.name}</h2>
          <Table striped>
            <thead>
              <tr>
                <th> # </th>
                <th> Sender </th>
                <th> Message </th>
                <th> Date </th>
                <th> Time </th>
              </tr>
            </thead>
            <tbody>{this.renderRoomChat(room)}</tbody>
          </Table>
        </div>
      )
    })
  }

  render() {
    return (
      <Container>
        <h1> Chat History </h1>
        <div> {this.renderChats()}</div>
      </Container>
    )
  }
}

export default ChatHistory
