import React, { Component } from 'react'
import './Login.styles.css'
import axios from 'axios'
export default class Register extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      email: '',
      password: ''
    }
  }
  handleName = (event) => {
    this.setState({
      name: event.target.value
    })
  }
  handleEmail = (event) => {
    this.setState({
      email: event.target.value
    })
  }
  handlePassword = (event) => {
    this.setState({
      password: event.target.value
    })
  }
  handleSubmit = (event) => {
    let { name, email, password } = this.state
    axios.post('/user/register', {
      name: name,
      email: email,
      password: password
    })
    event.preventDefault()
  }
  render(){
    return(
      <div class="text-center loginContainer">
        <form class="form-signin" onSubmit={this.handleSubmit}>
          <h1 class="h3 mb-3 font-weight-normal">Register</h1>
          <label for="inputName" class="sr-only">Name</label>
          <input type="text" id="inputName" class="form-control" placeholder="Name" onChange={this.handleName} required autofocus/>
          <label for="inputEmail" class="sr-only">Email address</label>
          <input type="email" id="inputEmail" class="form-control" placeholder="Email address" onChange={this.handleEmail} required/>
          <label for="inputPassword" class="sr-only">Password</label>
          <input type="password" id="inputPassword" class="form-control" placeholder="Password" onChange={this.handlePassword} required/>
          <br/>
          <button class="btn btn-lg btn-primary btn-block" type="submit">Register</button>
        </form>
      </div>
    )
  }
}
