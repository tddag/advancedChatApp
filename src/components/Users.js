import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Users.styles.css'
class Users extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      users: [],
    }
  }

  handleChange = e => {
    this.setState({
      userName: e.target.value,
    })
  }
  handleSubmit = () => {
    let { users } = this.state
    users.push({
      name: this.state.userName,
    })
    this.setState({
      users: users,
    })
    fetch('http://localhost:4000/user/create', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: this.state.userName,
      }),
    })
  }
  componentDidMount() {
    fetch('http://localhost:4000/user/get/all')
      .then(res => res.json())
      .then(users => {
        this.setState({
          users: users,
        })
      })
  }
  renderUsers = () => {
    return this.state.users.map((user, index) => {
      return (
        <tr key={index}>
          <th scope="row">{index + 1}</th>
          <td>{user.name}</td>
          <td>
            <Link to={`/chat/${user.name}`}>
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
