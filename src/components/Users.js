import React, { Component } from 'react'

class Users extends Component {
  state = {
    users: [{ id: 1, name: 'John Doe' }, { id: 2, name: 'Tony Stark' }],
  }

  renderUsers = () => {
    return this.state.users.map(user => {
      return (
        <tr>
          <th scope="row">{user.id}</th>
          <td>{user.name}</td>
        </tr>
      )
    })
  }
  render() {
    return (
      <div>
        <table
          class="table"
          style={{ margin: 'auto', textAlign: 'center', width: '50%' }}
        >
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Users</th>
            </tr>
          </thead>
          <tbody>{this.renderUsers()}</tbody>
        </table>
      </div>
    )
  }
}

export default Users
