import React, { Component } from 'react'
import './Login.styles.css'
import axios from 'axios'

let uri = process.env.NODE_ENV === 'production'
            ? ''
            : 'http://localhost:4000'
export default class Register extends Component {
  constructor(props){
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      registerStatus: '',
      timer: 5,
    }
  }
  handleCountDown = (timer) => {
    setTimeout(()=>{
      this.setState({
        timer: timer
      })
      return timer != 1 ? this.handleCountDown(timer-1) : timer
    }, 1000)
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
    axios.post(`${uri}/user/register`, {
      name: name,
      email: email,
      password: password
    })
    .then(res => {
      if (res.data) {
        this.setState({
          registerStatus: 'successful'
        })
        setTimeout(() => {
          window.location.replace('/login')
        }, 5000)
      }
    })
    .catch(() => {
      this.setState({
        registerStatus: 'failed'
      })
      setTimeout(() => {
        document.getElementById("errorMessage").style.display = "none";
      }, 6000)
    })

    event.preventDefault()
  }
  render(){
      return(
        <div class="text-center loginContainer">
          { this.state.registerStatus !== 'successful' ?
            (
              <form class="form-signin" onSubmit={this.handleSubmit}>
                <h1 class="h3 mb-3 font-weight-normal">Register</h1>
                { this.state.registerStatus == 'failed' ? (<p class="text-danger" id="errorMessage">Email is exist! Try another one!!!</p>) : ('')}
                <label for="inputName" class="sr-only">Name</label>
                <input type="text" id="inputName" class="form-control" placeholder="Name" onChange={this.handleName} required autofocus/>
                <label for="inputEmail" class="sr-only">Email address</label>
                <input type="email" id="inputEmail" class="form-control" placeholder="Email address" onChange={this.handleEmail} required/>
                <label for="inputPassword" class="sr-only">Password</label>
                <input type="password" id="inputPassword" class="form-control" placeholder="Password" onChange={this.handlePassword} required/>
                <br/>
                <button class="btn btn-lg btn-primary btn-block" type="submit">Register</button>
              </form>
            ) :
            (
              <div class="text-center">
                {this.handleCountDown(this.state.timer)}
                <h3 class="text-success"> Congratulation!! You have successfully registed!!!
                  Redirecting to login page after {this.state.timer} seconds!!
                </h3>
              </div>
            )
          }
        </div>
      )
    }
}
