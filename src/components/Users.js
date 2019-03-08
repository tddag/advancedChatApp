import React, { Component } from 'react'
import './Users.styles.css'
import { Button } from 'reactstrap'

let uri =
  process.env.NODE_ENV === 'production'
    ? 'https://taha-chatapp.herokuapp.com/'
    : 'http://localhost:4000'
class Users extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      users: [],
      errors: '',
      success: '',
    }
  }

  componentDidMount() {
    fetch(`${uri}/user/get/all`)
      .then(res => res.json())
      .then(users => {
        this.setState({
          users: users,
        })
      })

    let { socket } = this.props

    socket.on('registerSuccess', data => {
      let { users } = this.state
      users.push(data.newUser)
      this.setState({
        users: users,
        success: data.message,
        errors: '',
      })
    })
  }

  renderUsers = () => {
    return this.state.users.map((user, index) => {
      return (
        <tr key={index}>
          <th scope="row">{index + 1}</th>
          <td>{user.name}</td>
        </tr>
      )
    })
  }

  handleChange = e => {
    this.setState({
      userName: e.target.value,
    })
  }

  registerUser = () => {
    let { socket } = this.props
    let { userName } = this.state

    socket.emit('registerUser', {
      name: userName,
    })

    socket.on('registerFail', data => {
      this.setState({
        errors: data.message,
        success: '',
      })
    })
  }

  render() {
    return (
      <div>
        <table class="table users-table-container">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Users</th>
            </tr>
          </thead>
          <tbody>{this.renderUsers()}</tbody>
        </table>
        <div class="container1">
          <div class="users-container">
            <input
              type="text"
              placeholder="Create user"
              value={this.state.roomName}
              onChange={this.handleChange}
            />
            <Button color="info" onClick={this.registerUser}>
              Register
            </Button>
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

export default Users
