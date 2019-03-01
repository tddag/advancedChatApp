import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Users.styles.css'
class Users extends Component {
  state = {
    id: 1,
    userName: '',
    users: [],
  }

  handleChange = e => {
    this.setState({
      userName: e.target.value,
    })
  }
  handleSubmit = () => {
    let users = this.state.users
    let id = this.state.id
    users.push({
      id: id++,
      name: this.state.userName,
    })
    this.setState({
      id: id++,
      users: users,
    })
  }

  renderUsers = () => {
    return this.state.users.map(user => {
      return (
        <tr key={user.id}>
          <th scope="row">{user.id}</th>
          <td>{user.name}</td>
          <td>
            <Link to="/chat">
              <button>Chat</button>
            </Link>
          </td>
        </tr>
      )
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
              <th />
            </tr>
          </thead>
          <tbody>{this.renderUsers()}</tbody>
        </table>
        <div class="users-container">
          <input
            type="text"
            placeholder="Create user"
            value={this.state.userName}
            onChange={this.handleChange}
          />
          <button onClick={this.handleSubmit}>Create</button>
        </div>
      </div>
    )
  }
}

export default Users
