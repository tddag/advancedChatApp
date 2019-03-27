import React, { Component } from 'react'
import './Login.styles.css'
import axios from 'axios'
export default class Login extends Component {
  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      loggedIn: false
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot){
    if(prevState.loggedIn !== this.state.loggedIn){
      window.location.replace('/')
    }
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
    let { email, password } = this.state
    axios.post('/user/login', {
      email: email,
      password: password
    }).then(res => {
      localStorage.setItem('jwtToken', res.data)
      this.setState({
        loggedIn: true
      })
    })
    event.preventDefault()
  }
  render(){
    return(
      <div class="text-center loginContainer">
        <form class="form-signin" onSubmit={this.handleSubmit}>
          <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
          <label for="inputEmail" class="sr-only">Email address</label>
          <input type="email" id="inputEmail" class="form-control" placeholder="Email address" onChange={this.handleEmail} required autofocus/>
          <label for="inputPassword" class="sr-only">Password</label>
          <input type="password" id="inputPassword" class="form-control" placeholder="Password" onChange={this.handlePassword} required/>
          <br/>
          <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        </form>
      </div>
    )
  }
}
